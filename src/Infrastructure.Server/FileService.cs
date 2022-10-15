namespace Decree.Stationery.Ecommerce.Infrastructure.Server
{
    using System;
    using AutoMapper;
    using Microsoft.Extensions.Configuration;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Decree.Stationery.Ecommerce.Core.Application.Services;
    using Decree.Stationery.Ecommerce.Infrastructure.FileStorage.Aws.S3;
    using System.Threading.Tasks;
    using Decree.Stationery.Ecommerce.Core.Application.Exceptions;
    using System.IO;
    using ExcelDataReader;
    using System.Net.Http;
    using System.Threading;
    using System.Collections.Generic;
    using System.IO.Compression;

    public class FileService : IFileService
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IAwsStorageService _awsService;

        public FileService(
            IMapper mapper,
            IConfiguration configuration,
            IAwsStorageService awsService
        )
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _awsService = awsService ?? throw new ArgumentNullException(nameof(awsService));
        }

        public async Task<FileResultDto> UploadFile(UploadFileMessage file)
        {
            if (file == null)
            {
                throw new Exception("Invalid file");
            }

            var filePath = await _awsService.UploadFileAsync(file);
            return new FileResultDto { Url = filePath };
        }


        public async Task<FileResultDto> UploadSVGFile(UploadFileMessage file)
        {
            if (file == null)
            {
                throw new Exception("Invalid file");
            }
            if (file.Type != "image/svg+xml")
            {
                throw new InvalidContentTypeException("Invalid svg file");
            }
            var filePath = await _awsService.UploadFileAsync(file);
            return new FileResultDto { Url = filePath };
        }

        public async Task DeleteFile(string file)
        {
            if (string.IsNullOrEmpty(file))
            {
                throw new Exception("Invalid filename");
            }

            await _awsService.DeleteFileAsync(file);
        }

        public async Task ReplaceFilesInsideTheZip(string url, List<UploadFileMessage> files, bool removeOldFiles = true)
        {

            var notes = new Dictionary<string, string>();
            var mapPath = _awsService.GetRootFolder();//result /app
            var startPath = mapPath + "/Files/" + Guid.NewGuid().ToString();
            var zipOutput = mapPath + "/FilesOutput/Zip/";
            var zipFileName = Path.GetFileName(url).Replace(".zip", "");
            var zipPath = zipOutput + zipFileName + ".zip";
            var extractPath = zipOutput + zipFileName;

            try
            {
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

                if (Directory.Exists(extractPath))
                {
                    Directory.Delete(extractPath);
                }

                //Download Zipfile
                var stream = await GetStreamFromUrlAsync(url);
                var fileNameZip = startPath + "/" + Path.GetFileName(url);
                using (var fileStream = new FileStream(fileNameZip, FileMode.Create, FileAccess.Write))
                {
                    stream.CopyTo(fileStream);

                    fileStream.Close();
                    fileStream.Dispose();
                }
                //

                ZipFile.ExtractToDirectory(fileNameZip, extractPath);


                foreach (var item in files)
                {
                  
                    var fileurl = extractPath + "/" + Path.GetFileName(item.FileName);

                    if (File.Exists(fileurl))
                    {
                        File.Delete(fileurl);
                    }
                    using (MemoryStream itemStream = new MemoryStream(item.FileContent))
                    {
                        using (var fileStream = new FileStream(fileurl, FileMode.Create, FileAccess.Write))
                        {
                            itemStream.CopyTo(fileStream);

                            fileStream.Close();
                            fileStream.Dispose();
                        }
                        itemStream.Close();
                        itemStream.Dispose();
                    }
                }

                ZipFile.CreateFromDirectory(extractPath, zipPath);

                try
                {
                    await _awsService.DeleteFileAsync(zipFileName + ".zip");
                } 
                catch { }

                Thread.Sleep(5000);

                //Create Zip File and upload to shopify order
                using (MemoryStream ms = new MemoryStream())
                {
                    using (var fileZip = File.OpenRead(zipPath))
                    {
                        fileZip.CopyTo(ms);
                        var fileNameZip2 = Path.GetFileName(zipPath);
                        var filePathStlZip = await _awsService.UploadFileAsync(new UploadFileMessage()
                        {
                            FileContent = ms.ToArray(),
                            FileName = fileNameZip2,
                            Type = "application/zip"
                        });
                        fileZip.Close();
                        fileZip.Dispose();
                    }
                    ms.Close();
                    ms.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

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

            if (Directory.Exists(extractPath))
            {
                Directory.Delete(extractPath, true);
            }
        }

        private async Task<Stream> GetStreamFromUrlAsync(string url)
        {
            byte[] imageData = null;

            using (var wc = new System.Net.WebClient())
                imageData = wc.DownloadData(url);

            return new MemoryStream(imageData);

            //var client = new HttpClient();
            //var response = await client.GetAsync(url);

            //using (var stream = await response.Content.ReadAsStreamAsync())
            //{
            //    return stream;
            //}
            //return null;
        }

    }
}