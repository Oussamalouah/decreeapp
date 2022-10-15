namespace Decree.Stationery.Ecommerce.Infrastructure.Server
{
    using AutoMapper;
    using CsvHelper;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Decree.Stationery.Ecommerce.Core.Application.Messages.ShopifyWebhook;
    using Decree.Stationery.Ecommerce.Core.Application.Services;
    using Decree.Stationery.Ecommerce.Core.Domain.Models;
    using Decree.Stationery.Ecommerce.Core.Domain.Services;
    using Decree.Stationery.Ecommerce.Infrastructure.Ecommerce.Shopify;
    using Decree.Stationery.Ecommerce.Infrastructure.File.Conversion;
    using Decree.Stationery.Ecommerce.Infrastructure.FileStorage.Aws.S3;
    using Decree.Stationery.Ecommerce.Infrastructure.Server.Models;
    using ExcelDataReader;
    using global::Infrastructure.Utility;
    using global::Infrastructure.Utility.Template;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Globalization;
    using System.IO;
    using System.IO.Compression;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;

    public class OrderTakerService : IOrderTakerService
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IShopifyOrderService _shopifyOrderService;
        private readonly IAwsStorageService _awsService;
        private readonly IConvertSVGToSTL _convertSVGToSTL;
        private readonly ICustomerAddressRepository _customerAddressRepository;

        private readonly ICustomerRepository _customerRepository;
        private readonly INotificationService _notificationService;
        private readonly ILogger _logger;

        public OrderTakerService(
            IMapper mapper,
            IConfiguration configuration,
            IShopifyOrderService shopifyOrderService,
            IAwsStorageService awsService,
            IConvertSVGToSTL convertSVGToSTL,
            ICustomerAddressRepository customerAddressRepository,
            INotificationService notificationService,
            ILogger<OrderTakerService> logger,
            ICustomerRepository customerRepository
        )
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _shopifyOrderService = shopifyOrderService ?? throw new ArgumentNullException(nameof(shopifyOrderService));
            _awsService = awsService ?? throw new ArgumentNullException(nameof(awsService));
            _convertSVGToSTL = convertSVGToSTL ?? throw new ArgumentNullException(nameof(convertSVGToSTL));
            _customerAddressRepository = customerAddressRepository ?? throw new ArgumentNullException(nameof(customerAddressRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _notificationService = notificationService ?? throw new ArgumentNullException(nameof(notificationService));
            _customerRepository = customerRepository ?? throw new ArgumentNullException(nameof(customerRepository));
        }

        public async Task UpdateWebhookUrl(string apiUrl, string type)
        {
            switch (type)
            {
                case "CREATE_ORDER":
                    await _shopifyOrderService.UpdateShopifyCreateOrderWebhookUrl(apiUrl);
                    break;
                default:
                    break;
            }
        }

        public async Task UploadStlFileToShopifyOrderAsync(ShopifyOrderDto order, Dictionary<string, string> requestHeaders, string requestBody)
        {
            var notes = new Dictionary<string, string>();
            var mapPath = _awsService.GetRootFolder();//result /app
            var startPath = mapPath + "/Files/" + order.order_number;
            var zipOutput = mapPath + "/FilesOutput/" + order.order_number;
            var zipPath = zipOutput + "/STL_FILES_" + order.order_number + ".zip";

            try
            {
                var existingOrder = await _shopifyOrderService.GetShopifyOrder(order.id);

                if (!Directory.Exists(startPath))
                {
                    Directory.CreateDirectory(startPath);
                }

                if (!Directory.Exists(zipOutput))
                {
                    Directory.CreateDirectory(zipOutput);
                }

                if (File.Exists(zipPath))
                {
                    File.Delete(zipPath);
                }

                foreach (var item in existingOrder.LineItems)
                {
                    var property = item.Properties.FirstOrDefault(x => x.Name.ToString() == "_svg_file");
                    if (property != null)
                    {
                        var splitFileName = property.Value.ToString().Split("?");
                        var stream = await GetStreamFromUrlAsync(splitFileName[0]);
                        var fileName = startPath + "/" + Path.GetFileName(splitFileName[0]);
                        using (var fileStream = new FileStream(fileName, FileMode.Create, FileAccess.Write))
                        {
                            stream.CopyTo(fileStream);

                            fileStream.Close();
                            fileStream.Dispose();
                        }
                        stream.Close();
                        stream.Dispose();

                        Thread.Sleep(3000);
                        _convertSVGToSTL.Start(fileName, fileName);
                        Thread.Sleep(3000);
                    }
                }

                var filePathManualOption = _awsService.GetBaseUrl() + "Manual Conversion of SVG to STL Instruction Option.docx";
                var stream1 = await GetStreamFromUrlAsync(filePathManualOption);
                var fileName1 = startPath + "/" + Path.GetFileName(filePathManualOption);
                using (var fileStream1 = new FileStream(fileName1, FileMode.Create, FileAccess.Write))
                {
                    stream1.CopyTo(fileStream1);

                    fileStream1.Close();
                    fileStream1.Dispose();
                }
                stream1.Close();
                stream1.Dispose();

                var filePathManualOptionVideo = _awsService.GetBaseUrl() + "Manual Convert SVG file to STL Sample Video.mp4";
                var stream2 = await GetStreamFromUrlAsync(filePathManualOptionVideo);
                var fileName2 = startPath + "/" + Path.GetFileName(filePathManualOptionVideo);
                using (var fileStream2 = new FileStream(fileName2, FileMode.Create, FileAccess.Write))
                {
                    stream2.CopyTo(fileStream2);

                    fileStream2.Close();
                    fileStream2.Dispose();
                }
                stream2.Close();
                stream2.Dispose();

                ZipFile.CreateFromDirectory(startPath, zipPath);

                //Create Zip File and upload to shopify order
                using (MemoryStream ms = new MemoryStream())
                {
                    using (var fileZip = File.OpenRead(zipPath))
                    {
                        fileZip.CopyTo(ms);
                        var fileNameZip = Path.GetFileName(zipPath);
                        var filePathStlZip = await _awsService.UploadFileAsync(new UploadFileMessage()
                        {
                            FileContent = ms.ToArray(),
                            FileName = fileNameZip,
                            Type = "application/zip"
                        });
                        fileZip.Close();
                        fileZip.Dispose();
                        notes.Add("STL_FILES", filePathStlZip);
                    }
                    ms.Close();
                    ms.Dispose();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in uploading and converting file", null);
            }

            var filePathStl = _awsService.GetBaseUrl() + "Manual Conversion of SVG to STL Instruction Option.docx";
            notes.Add("STL_FILE_OPTION", filePathStl);
            await _shopifyOrderService.UpdateOrderNoteAttribute(order.id, notes);

            //will possibly add this on the other process cause it create error in reading the file
            //Delete the directories
            Thread.Sleep(2000);
            if (Directory.Exists(startPath))
            {
                Directory.Delete(startPath, true);
            }

            if (Directory.Exists(zipOutput))
            {
                Directory.Delete(zipOutput, true);
            }
        }

        public async Task<List<CustomerAddressDto>> UploadCustomerAddress(string customerId, UploadFileMessage file)
        {
            var results = new List<CustomerAddressDto>();

            if (!(file.FileName.Contains(".csv") || file.FileName.Contains(".xls") || file.FileName.Contains(".xlsx")))
            {
                throw new Exception("Invalid file format");
            }

            if (file.FileName.Contains(".csv"))
            {
                using (var memorStream = new MemoryStream(file.FileContent))
                {
                    using (var reader = new StreamReader(memorStream))
                    using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                    {
                        var records = csv.GetRecords<CustomerAddressModel>();

                        foreach (var record in records)
                        {

                            try
                            {
                                var resultMap = _mapper.Map<CustomerAddressDto>(record);
                                resultMap.CustomerId = customerId;
                                var result = await AddCustomerAddress(customerId, resultMap);
                                results.Add(resultMap);
                            }
                            catch
                            {
                                //Ignore errors
                            }
                        }
                    }
                }
            }
            else
            {
                using (var memorStream = new MemoryStream(file.FileContent))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(memorStream))
                    {

                        DataSet result = reader.AsDataSet(new ExcelDataSetConfiguration()
                        {
                            ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                            {
                                UseHeaderRow = true
                            }
                        });
                        for (var i = 0; i < result.Tables[0].Rows.Count; i++)
                        {
                            var mapResult = new CustomerAddressDto()
                            {
                                CustomerId = customerId,
                                FirstName = result.Tables[0].Rows[i]["FirstName"]?.ToString() ?? "",
                                LastName = result.Tables[0].Rows[i]["LastName"]?.ToString() ?? "",
                                Title = result.Tables[0].Rows[i]["Title"]?.ToString() ?? "",
                                MiddleName = result.Tables[0].Rows[i]["MiddleName"]?.ToString() ?? "",
                                Company = result.Tables[0].Rows[i]["Company"]?.ToString() ?? "",
                                Address1 = result.Tables[0].Rows[i]["Address1"]?.ToString() ?? "",
                                Address2 = result.Tables[0].Rows[i]["Address2"]?.ToString() ?? "",
                                City = result.Tables[0].Rows[i]["City"]?.ToString() ?? "",
                                State = result.Tables[0].Rows[i]["State"]?.ToString() ?? "",
                                Postal = result.Tables[0].Rows[i]["Postal"]?.ToString() ?? "",
                                Country = result.Tables[0].Rows[i]["Country"]?.ToString() ?? "",
                                Phone = result.Tables[0].Rows[i]["Phone"]?.ToString() ?? "",
                                EmailAddress = result.Tables[0].Rows[i]["EmailAddress"]?.ToString() ?? "",
                            };
                            try

                            {
                                var returnResult = await AddCustomerAddress(customerId, mapResult);
                                results.Add(returnResult);
                            }
                            catch
                            {
                                //Ignore errors
                            }
                        }


                    };
                }
            }
            return results;

        }

        private async Task<Stream> GetStreamFromUrlAsync(string url)
        {
            byte[] imageData = null;

            using (var wc = new System.Net.WebClient())
                imageData = wc.DownloadData(url);

            return new MemoryStream(imageData);
        }

        public async Task<List<CustomerAddressDto>> GetCustomerAddresses(string customerId)
        {
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException(customerId);

            var results = await _customerAddressRepository.GetAllByCustomerId(customerId);
            return _mapper.Map<List<CustomerAddressDto>>(results);
        }

        public async Task<CustomerAddressDto> GetCustomerAddress(Guid id)
        {
            if (id == Guid.Empty) throw new ArgumentNullException("Empty id");

            var result = await _customerAddressRepository.Get(id);
            return _mapper.Map<CustomerAddressDto>(result);
        }

        public async Task<CustomerAddressDto> AddCustomerAddress(string customerId, CustomerAddressDto data)
        {
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException(customerId);
            if (data == null) throw new ArgumentNullException("Empty data");
            var mapData = _mapper.Map<CustomerAddress>(data);

            var shopifyAddress = await _shopifyOrderService.InsertCustomerAddress(customerId, data);
            mapData.ShopifyCustomerAddressId = shopifyAddress.ShopifyCustomerAddressId.ToString();
            var result = await _customerAddressRepository.AddAsync(mapData);

            return _mapper.Map<CustomerAddressDto>(result);
        }

        public async Task<CustomerAddressDto> UpdateCustomerAddress(Guid id, CustomerAddressDto data)
        {
            if (id == Guid.Empty) throw new ArgumentNullException("Empty id");
            if (data == null) throw new ArgumentNullException("Empty data");
            var mapData = _mapper.Map<CustomerAddress>(data);

            var existingCustomerAddress = await _customerAddressRepository.Get(id);
            if (existingCustomerAddress == null) throw new Exception("Address not found");

            await _shopifyOrderService.UpdateCustomerAddress(existingCustomerAddress.CustomerId, existingCustomerAddress.ShopifyCustomerAddressId, data);

            mapData.Id = id.ToString();
            var result = await _customerAddressRepository.Save(mapData);
            var resultMap = _mapper.Map<CustomerAddressDto>(result);

            return resultMap;
        }

        public async Task DeleteCustomerAddress(Guid id)
        {
            if (id == Guid.Empty) throw new ArgumentNullException("Empty id");

            var existingCustomerAddress = await _customerAddressRepository.Get(id);
            if (existingCustomerAddress == null) throw new Exception("Address not found");

            await _customerAddressRepository.Delete(Guid.Parse(existingCustomerAddress.Id));

            try
            {
                await _shopifyOrderService.RemoveCustomerAddress(existingCustomerAddress.CustomerId, existingCustomerAddress.ShopifyCustomerAddressId);
            }
            catch (Exception ex)
            {
                //ignore if deleted
            }
        }

        public void SendContactUs(ContactUsMessage message)
        {
            var toEmail = (message.Email ?? "");
            if (string.IsNullOrEmpty(toEmail)) throw new ArgumentNullException("Invalid email");
            if (string.IsNullOrEmpty(message.Message)) throw new ArgumentNullException("Invalid message");

            Dictionary<string, string> bodyValues = new Dictionary<string, string>
            {
                {"Email", message.Email },
                {"Name", message.Name},
                {"PhoneNumber", message.PhoneNumber},
                {"Message", (message.Message ?? "")},
                {"AdditionalMessage", ""},
            };
            var emailContactUsEmail = Environment.GetEnvironmentVariable("Decree_ContactUsEmail") ?? _configuration["EmailConfig:ContactUsEmail"].ToString();

            var bodyTemplate = EmailTemplate.GetContactUsTemplate();
            var subjectTemplate = "Contact Us";

            var subject = WebUtility.HtmlDecode(subjectTemplate);
            var body = WebUtility.HtmlDecode(bodyTemplate);
            MailTemplateParser.ParseSubjectAndBody(bodyValues, ref subject, ref body);

            var emailMessage = new EmailMessage()
            {
                Body = body,
                Subject = subject,
                IsHtmlEmail = true,
                Recipient = emailContactUsEmail,
                Attachments = null
            };

            _notificationService.SendEmail(emailMessage);
        }

        public void AddEmailSubscription(string email, string code, string token)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    throw new Exception("Email is empty");
                }

                _notificationService.AddEmailSubscription(email, code, token);
            }
            catch (Exception ex)
            {
                if (ex.Message != null)
                {
                    if (ex.Message.Contains("Address format"))
                    {
                        throw new Exception("Invalid email address format");
                    }
                    else if (ex.Message.Contains("Email already exists"))
                    {
                        throw new Exception("Email is already subscribed");
                    }
                    else if (ex.Message.Contains("Email address is invalid"))
                    {
                        throw new Exception("Email address is invalid");
                    }
                    else
                    {
                       throw ex;
                    }
                }
                else
                {
                    throw ex;
                }
            }
        }

        public async Task<string> GetShopifyCustomerId(string emailAddress)
        {
            return await _shopifyOrderService.GetCustomerId(emailAddress);
        }

        public dynamic GetRefreshToken(string refreshToken)
        {
            return _notificationService.GetRefreshToken(refreshToken);
        }

        public dynamic GetAccessToken(string code)
        {
            return _notificationService.GetAuthorization(code);
        }

        public async Task<CustomerDto> GetCustomerByCustomerId(string customerId)
        {
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException("Empty id");

            var result = await _customerRepository.GetByCustomerId(customerId);
            var mapResult = _mapper.Map<CustomerDto>(result);
            var resultGroups = _mapper.Map<List<GroupDto>>(mapResult?.Groups ?? new List<GroupDto>());

            foreach (var group in resultGroups)
            {
                group.CustomerAddressesWithNames = new List<CustomerAddressShallowDto>();
                foreach (var item in group.CustomerAddresses)
                {
                    var address = await GetCustomerAddress(Guid.Parse(item));
                    if (address != null)
                    {
                        group.CustomerAddressesWithNames.Add(new CustomerAddressShallowDto
                        {
                            Id = address.Id,
                            CustomerId = address.CustomerId,
                            FirstName = address.FirstName,
                            LastName = address.LastName,
                            MiddleName = address.MiddleName,
                            Title = address.Title
                        });
                    }
                }
            }
            mapResult.Groups = resultGroups;
            return mapResult;
        }

        public async Task<CustomerDto> GetCustomer(string id)
        {
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("Empty id");

            var result = await _customerRepository.Get(Guid.Parse(id));

            var mapResult = _mapper.Map<CustomerDto>(result);
            var resultGroups = _mapper.Map<List<GroupDto>>(mapResult?.Groups ?? new List<GroupDto>());

            foreach (var group in resultGroups)
            {
                group.CustomerAddressesWithNames = new List<CustomerAddressShallowDto>();
                foreach (var item in group.CustomerAddresses)
                {
                    var address = await GetCustomerAddress(Guid.Parse(item));
                    if (address != null)
                    {
                        group.CustomerAddressesWithNames.Add(new CustomerAddressShallowDto
                        {
                            Id = address.Id,
                            CustomerId = address.CustomerId,
                            FirstName = address.FirstName,
                            LastName = address.LastName,
                            MiddleName = address.MiddleName,
                            Title = address.Title
                        });
                    }
                }
            }
            mapResult.Groups = resultGroups;
            return mapResult;
        }

        public async Task<List<GroupDto>> GetCustomerGroupsByCustomerId(string customerId)
        {
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException("Empty id");

            var result = await _customerRepository.GetByCustomerId(customerId);

            var resultGroups = _mapper.Map<List<GroupDto>>(result?.Groups ?? new List<Group>());

            foreach (var group in resultGroups)
            {
                group.CustomerAddressesWithNames = new List<CustomerAddressShallowDto>();
                foreach (var item in group.CustomerAddresses)
                {
                    var address = await GetCustomerAddress(Guid.Parse(item));
                    if(address != null)
                    {
                        group.CustomerAddressesWithNames.Add(new CustomerAddressShallowDto
                        {
                             Id = address.Id,
                             CustomerId = address.CustomerId,
                             FirstName = address.FirstName,
                             LastName = address.LastName,
                             MiddleName = address.MiddleName,
                             Title = address.Title
                        });
                    }
                }
            }

            return resultGroups;
        }

        public async Task<CustomerDto> AddCustomerGroup(string customerId, GroupDto data)
        {
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException(customerId);
            if (data == null) throw new ArgumentNullException("Empty data");

            var customer = await _customerRepository.GetByCustomerId(customerId);
            var group = _mapper.Map<Group>(data);
            group.Id = Guid.NewGuid().ToString();
            if (customer == null)
            {
                customer = new Customer
                {
                    CustomerId = customerId,
                    Id = Guid.NewGuid().ToString(),
                    Groups = new List<Group>
                    {
                        group
                    }
                };
                customer = await _customerRepository.AddAsync(customer);
            }
            else
            {
                customer.Groups.Add(group);
                await _customerRepository.Save(customer);
            }

            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task RemoveCustomerGroup(string customerId, string groupId)
        {
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException(customerId);

            var customer = await _customerRepository.GetByCustomerId(customerId);

            if (customer != null)
            {
                var existingCustomerGroup = customer.Groups.FirstOrDefault(x => x.Id == groupId);
                if (existingCustomerGroup != null)
                {
                    customer.Groups.Remove(existingCustomerGroup);
                    await _customerRepository.Save(customer);
                }
            }
        }

        public async Task<CustomerDto> UpdateCustomerGroup(string customerId, string groupId, GroupDto data)
        {
            if (string.IsNullOrEmpty(groupId) || groupId == Guid.Empty.ToString()) throw new ArgumentNullException("Empty id");
            if (data == null) throw new ArgumentNullException("Empty data");
            var mapData = _mapper.Map<GroupDto>(data);
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException(customerId);

            var customer = await _customerRepository.GetByCustomerId(customerId);

            if (customer != null)
            {
                var existingCustomerGroup = customer.Groups.FirstOrDefault(x => x.Id == groupId);
                if (existingCustomerGroup != null)
                {
                    existingCustomerGroup.Name = mapData.Name;
                    existingCustomerGroup.CustomerAddresses = mapData.CustomerAddresses;
                    await _customerRepository.Save(customer);
                }
            }

            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<List<CustomerAddressDto>> GetCustomerAddresses(string customerId, List<string> groups = null, List<string> addressContactIds = null)
        {
            var customerAddresses = new List<CustomerAddressDto>();

            if(addressContactIds != null)
            {
                foreach (var item in addressContactIds)
                {
                    var address = await GetCustomerAddress(Guid.Parse(item));
                    var mapAddress = _mapper.Map<CustomerAddressDto>(address);
                    customerAddresses.Add(mapAddress);
                }
            }

            if(groups != null)
            {
                var results = await GetCustomerGroupsByCustomerId(customerId);
                foreach (var group in results.Where(x => groups.Any(y => y == x.Id)).ToList())
                {
                    foreach (var item in group.CustomerAddresses)
                    {
                        var address = await GetCustomerAddress(Guid.Parse(item));
                        var mapAddress = _mapper.Map<CustomerAddressDto>(address);
                        customerAddresses.Add(mapAddress);
                    }
                }
            }
            return customerAddresses;
        }

        public async Task<GroupDto> GetCustomerGroup(string customerId, string groupId)
        {
            if(string.IsNullOrEmpty(groupId) || groupId == Guid.Empty.ToString()) throw new ArgumentNullException("Empty id");
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException(customerId);

            var customer = await _customerRepository.GetByCustomerId(customerId);

            if (customer != null)
            {
                var existingCustomerGroup = customer.Groups.FirstOrDefault(x => x.Id == groupId);
                if (existingCustomerGroup != null)
                {
                    return _mapper.Map<GroupDto>(existingCustomerGroup);
                }
            }

            throw new Exception("Group Not found");
        }

        public dynamic GetNewRefreshToken()
        {
            return _notificationService.ValidateToken(string.Empty);
        }

        public async Task RemoveCustomer(string customerId)
        {
            if (string.IsNullOrEmpty(customerId)) throw new ArgumentNullException(customerId);

            var customer = await _customerRepository.GetByCustomerId(customerId);

            if (customer != null)
            {
                await _customerRepository.Delete(Guid.Parse(customer.Id));
            }
        }

        public async Task<List<string>> GetOrdersOrderNumber(DateTime from, DateTime to)
        {
            return await _shopifyOrderService.GetOrdersOrderNumber(from, to);
        }
    }
}
