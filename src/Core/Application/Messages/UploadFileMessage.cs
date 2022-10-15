namespace Decree.Stationery.Ecommerce.Core.Application.Messages
{
    public class UploadFileMessage
    {
        public byte[] FileContent { get; set; }
        public string Type { get; set; }
        public string FileName { get; set; }
        public int FileSize { get; set; }
        public string Folder { get; set; }
    }
}