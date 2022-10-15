namespace Decree.Stationery.Ecommerce.Infrastructure.Ecommerce.Shopify
{
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.IO;
    using System.Linq;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Decree.Stationery.Ecommerce.Core.Application.Messages.ShopifyWebhook;
    using Microsoft.Extensions.Primitives;
    using ShopifySharp;
    using ShopifySharp.Enums;
    using ShopifySharp.Filters;
    using ShopifySharp.Lists;

    public class ShopifyOrderService : IShopifyOrderService
    {

        private readonly string _baseUrl;
        private readonly string _accessToken;
        private readonly string _apiKey;
        private readonly string _secretKey;
        
        public ShopifyOrderService(
            string baseUrl,
            string accessToken,
            string apiKey,
            string secretKey
        )
        {
            _baseUrl = baseUrl ?? throw new ArgumentNullException(nameof(baseUrl));
            _accessToken = accessToken ?? throw new ArgumentNullException(nameof(accessToken));
            _apiKey = apiKey ?? throw new ArgumentNullException(nameof(apiKey));
            _secretKey = secretKey ?? throw new ArgumentNullException(nameof(secretKey));
        }

        public async Task<Order> GetShopifyOrder(long orderId)
        {
            bool isValidDomain = await AuthorizationService.IsValidShopDomainAsync(_baseUrl);
            if (!isValidDomain) throw new Exception("Invalid shopify domain");

            var service = new OrderService(_baseUrl, _accessToken);

            var order = await service.GetAsync(orderId);

            return order;
        }

        public bool IsWebookAuthenticated(IEnumerable<KeyValuePair<string, StringValues>> requestHeaders, string requestBody)
        {
            return AuthorizationService.IsAuthenticWebhook(requestHeaders, requestBody, _secretKey);
        }

        public async Task UpdateOrderNoteAttribute(long orderId, Dictionary<string, string> attributes)
        {
            try
            {
                bool isValidDomain = await AuthorizationService.IsValidShopDomainAsync(_baseUrl);
                if (!isValidDomain) throw new Exception("Invalid shopify domain");

                var service = new OrderService(_baseUrl, _accessToken);

                var notes = attributes.Select(x => new NoteAttribute() { Name = x.Key, Value = x.Value }).ToList();
                var order = await service.UpdateAsync(orderId, new Order()
                {
                    NoteAttributes = notes
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateOrderStlFile(string orderNumber, string filePath)
        {
            try
            {
                bool isValidDomain = await AuthorizationService.IsValidShopDomainAsync(_baseUrl);
                if (!isValidDomain) throw new Exception("Invalid shopify domain");
                
                var service = new OrderService(_baseUrl, _accessToken);

                //This is temporary this will be remove once we have the webhook to get the order id
                var orders = await service.ListAsync();
                var orderId = orders.Items.FirstOrDefault(x => x.OrderNumber == Convert.ToInt32(orderNumber)).Id;
                //end

                var order = await service.UpdateAsync(Convert.ToInt64(orderId), new Order()
                {
                    NoteAttributes = new List<NoteAttribute>() 
                    { 
                        new NoteAttribute()
                        { 
                            Name = "STL_FILE", Value = filePath
                        } 
                    }
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateShopifyCreateOrderWebhookUrl(string apiUrl)
        {
            var service = new WebhookService(_baseUrl, _accessToken);

            //Delete all
            var createOrder = (await service.ListAsync())?.Items?.FirstOrDefault(x => x.Topic == "orders/create") ?? null;
            if (createOrder != null)
            {
                await service.DeleteAsync(createOrder.Id.Value);
            }

            await service.CreateAsync(new Webhook()
            {
                Topic = "orders/create",
                Address = apiUrl,

            });
        }

        public async Task<ListResult<Address>> GetCustomerAddresses(string customerId)
        {
            var service = new CustomerAddressService(_baseUrl, _accessToken);

            var customerAddresses = await service.ListAsync(long.Parse(customerId));

            return customerAddresses;
        }

        public async Task<Address> GetCustomerAddress(string customerId, string customerAddressId)
        {
            var service = new CustomerAddressService(_baseUrl, _accessToken);

            var customerAddress = await service.GetAsync(long.Parse(customerId), long.Parse(customerAddressId));

            return customerAddress;
        }

        public async Task<CustomerAddressDto> InsertCustomerAddress(string customerId, CustomerAddressDto data)
        {
            var service = new CustomerAddressService(_baseUrl, _accessToken);

            var customerAddress = await service.CreateAsync(long.Parse(customerId), new Address()
            {
                FirstName = data.FirstName,
                LastName = data.LastName,
                Company = data.Company,
                Country = data.Country,
                CountryCode = data.Country,
                CountryName = data.CountryName,
                Phone = data.Phone,
                Zip = data.Postal,
                Address1 = data.Address1,
                Address2 = data.Address2,
            });

            data.ShopifyCustomerAddressId = customerAddress.Id.ToString();
            return data;
        }

        public async Task<List<CustomerAddressDto>> InsertCustomerAddresses(string customerId, List<CustomerAddressDto> data)
        {
            var results = new List<CustomerAddressDto>();
            foreach(var address in data)
            {
                var result = await InsertCustomerAddress(customerId, address);
                results.Add(result);
            }
            return results;
        }

        public async Task<Address> UpdateCustomerAddress(string customerId, string customerAddressId, CustomerAddressDto data) 
        {
            var service = new CustomerAddressService(_baseUrl, _accessToken);
            var existingAddress = await GetCustomerAddress(customerId, customerAddressId);
            existingAddress.FirstName = data.FirstName;
            existingAddress.LastName = data.LastName;
            existingAddress.Company = data.Company;
            existingAddress.Country = data.Country;
            existingAddress.CountryCode = data.CountryCode;
            existingAddress.Phone = data.Phone;
            existingAddress.Zip = data.Postal;
            existingAddress.Address1 = data.Address1;
            existingAddress.Address2 = data.Address2;

            var customerAddress = await service.UpdateAsync(long.Parse(customerId), long.Parse(customerAddressId), existingAddress);

            return customerAddress;
        }

        public async Task RemoveCustomerAddress(string customerId, string customerAddressId)
        {
            var service = new CustomerAddressService(_baseUrl, _accessToken);

            await service.DeleteAsync(long.Parse(customerId), long.Parse(customerAddressId));
        }

        public async Task<string> GetCustomerId(string emailAddress)
        {
            var service = new CustomerService(_baseUrl, _accessToken);
            var customers = await service.SearchAsync(new CustomerSearchListFilter
            {
                Query = "email:" + emailAddress,
                Fields = "id,email"
            });
            return customers.Items?.FirstOrDefault()?.Id?.ToString() ?? "";
        }

        public async Task<List<string>> GetOrdersOrderNumber(DateTime from, DateTime to)
        {
            var service = new OrderService(_baseUrl, _accessToken);
            var orders = await service.ListAsync(new OrderListFilter() { CreatedAtMax = to , CreatedAtMin = from });
            return orders.Items?.Select(x => x.OrderNumber.ToString())?.ToList() ?? new List<string>();
        }
    }
}
