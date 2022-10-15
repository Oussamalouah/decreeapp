namespace Decree.Stationery.Ecommerce.Core.Application.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;

    public interface IFileService
    {
        Task<FileResultDto> UploadSVGFile(UploadFileMessage file);
        Task<FileResultDto> UploadFile(UploadFileMessage file);
        Task DeleteFile(string file);
        Task ReplaceFilesInsideTheZip(string url, List<UploadFileMessage> files, bool removeOldFiles = true);
    }
}