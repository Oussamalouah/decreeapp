namespace Decree.Stationery.Ecommerce.Infrastructure.File.Conversion
{
    using System.IO;

    public class ConvertSVGToSTL : IConvertSVGToSTL
    {
        public ConvertSVGToSTL()
        {

        }


        public void Start(string inputPath, string outputPath)
        {
            var outputDXF = outputPath.Replace(".svg", ".dxf");
            var outputSTL = outputPath.Replace(".svg", ".stl");

            if (File.Exists(outputDXF))
            {
                File.Delete(outputDXF);
            }

            if (File.Exists(outputSTL))
            {
                File.Delete(outputSTL);
            }

            ConvertSVGtoDXF(inputPath, outputDXF);
            ConvertDXFToSTL(outputDXF, outputSTL);
        }

        public void ConvertSVGtoDXF(string inputPath, string outputPath)
        {
            FileStream fs = new FileStream(outputPath, FileMode.Create);
            fs.Close();
        }

        //public void ConvertSVGtoDXF(string inputPath, string outputPath)
        //{
        //    //input svg file
        //    Aspose.CAD.License licImage = new Aspose.CAD.License();
        //    licImage.SetLicense("Aspose.CAD.NET.lic");
        //    using (var img = Aspose.CAD.Image.Load(inputPath))
        //    {
        //        // create an instance of CadRasterizationOptions & set resultant page size
        //        var rasterizationOptions = new Aspose.CAD.ImageOptions.CadRasterizationOptions()
        //        {
        //            PageSize = new Aspose.CAD.SizeF(600, 800)
        //        };

        //        // save resultant DXF
        //        img.Save(outputPath, new Aspose.CAD.ImageOptions.DxfOptions() { TextAsLines = true, VectorRasterizationOptions = rasterizationOptions, });
        //    }
        //}


        public void ConvertDXFToSTL(string input, string output)
        {
            FileStream fs = new FileStream(output, FileMode.Create);
            fs.Close();
        }

        //public void ConvertDXFToSTL(string input, string output)
        //{
        //    Aspose.ThreeD.License licThreeD = new Aspose.ThreeD.License();
        //    licThreeD.SetLicense("Aspose.3D.NET.lic");

        //    var document = new Aspose.ThreeD.Scene(input);

        //    var options = new Aspose.ThreeD.Formats.STLSaveOptions();
        //    options.FileName = Path.GetFileName(output);
        //    options.FlipCoordinateSystem = true;
        //    document.Save(output, options);
        //}
    }
}