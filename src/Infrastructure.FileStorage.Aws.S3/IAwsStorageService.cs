namespace Decree.Stationery.Ecommerce.Infrastructure.FileStorage.Aws.S3
{
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IAwsStorageService
    {
        Task<string> UploadFileAsync(UploadFileMessage file);

        Task<List<string>> GetFilesAsync(string folder);

        string GetBaseUrl();

        string GetRootFolder();

        Task DeleteFileAsync(string fileName);
    }
}