namespace Decree.Stationery.Ecommerce.Infrastructure.File.Conversion
{
    using System.IO;
    public interface IConvertSVGToSTL
    {
        void Start(string inputPath, string outputPath);
    }
}