namespace Decree.Stationery.Ecommerce.Infrastructure.FileStorage.Aws.S3
{
    using System;
    using System.IO;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Amazon.S3;
    using Amazon.Runtime;
    using Amazon.S3.Transfer;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using Amazon.S3.Model;

    public class AwsStorageService : IAwsStorageService
    {
        private readonly string _bucket;
        private readonly string _region;
        private readonly string _baseUrl;
        private readonly string _accessKey;
        private readonly string _secretKey;
        private readonly string _rootFolder;

        public AwsStorageService(
            string bucket,
            string region,
            string baseUrl,
            string accessKey,
            string secretKey,
            string rootFolder
        )
        {
            _bucket = bucket ?? throw new ArgumentNullException(nameof(bucket));
            _region = region ?? throw new ArgumentNullException(nameof(region));
            _baseUrl = baseUrl ?? throw new ArgumentNullException(nameof(baseUrl));
            _accessKey = accessKey ?? throw new ArgumentNullException(nameof(accessKey));
            _secretKey = secretKey ?? throw new ArgumentNullException(nameof(secretKey));
            _rootFolder = rootFolder ?? throw new ArgumentNullException(nameof(rootFolder));
        }

        public string GetBaseUrl()
        {
            return _baseUrl;
        }

        public async Task<List<string>> GetFilesAsync(string folder)
        {
            var files = new List<string>();
            var credentials = new BasicAWSCredentials(_accessKey, _secretKey);
            using (var client = new AmazonS3Client(credentials, Amazon.RegionEndpoint.GetBySystemName(_region)))
            {
                ListObjectsRequest listRequest = new ListObjectsRequest
                {
                    BucketName = _bucket,
                    Prefix = folder
                };

                ListObjectsResponse listResponse;
                do
                {
                    listResponse = await client.ListObjectsAsync(listRequest);
                    foreach (S3Object obj in listResponse.S3Objects)
                    {
                        files.Add(obj.Key);
                    }

                    listRequest.Marker = listResponse.NextMarker;
                } while (listResponse.IsTruncated);
            }
            return files;
        }

        public string GetRootFolder()
        {
            return _rootFolder;
        }

        public async Task<string> UploadFileAsync(UploadFileMessage file)
        {
            var imageUrl = "";

            //Upload the item image to s3
            if (file.FileContent != null && file.FileContent.Length > 0)
            {

                var credentials = new BasicAWSCredentials(_accessKey, _secretKey);

                var uploadRequest = new TransferUtilityUploadRequest
                {
                    Key = file.FileName,
                    InputStream = new MemoryStream(file.FileContent),
                    BucketName = _bucket,
                    CannedACL = S3CannedACL.PublicRead,
                    ContentType = file.Type
                };

                using (var client = new AmazonS3Client(credentials, Amazon.RegionEndpoint.GetBySystemName(_region)))
                {
                    var transferUtility = new TransferUtility(client);
                    await transferUtility.UploadAsync(uploadRequest);
                }

                var baseUri = new Uri(_baseUrl);
                imageUrl = new Uri(baseUri, uploadRequest.Key).ToString();

            }
            return imageUrl;
        }

        public async Task DeleteFileAsync(string fileName)
        {

            var credentials = new BasicAWSCredentials(_accessKey, _secretKey);

            using (var client = new AmazonS3Client(credentials, Amazon.RegionEndpoint.GetBySystemName(_region)))
            {
               await client.DeleteObjectAsync(new DeleteObjectRequest() { BucketName = _bucket, Key = fileName });
            }

        }
    }
}