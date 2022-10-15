namespace Decree.Stationery.Ecommerce.Infrastructure.WebApi.Controllers
{
    using Decree.Stationery.Ecommerce.Infrastructure.FileStorage.Aws.S3;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System;
    using System.IO;
    using System.Reflection;

    [Route("api")]
    public class PingController : Controller
    {

        private readonly IAwsStorageService _awsService;
        public PingController(
            IAwsStorageService awsService,
          ILogger<PingController> logger)
        {
            _awsService = awsService ?? throw new ArgumentNullException(nameof(awsService));
        }

        [HttpGet]
        [Route("ping")]
        public string Ping() => $"PING! The server is alive.";

        [Authorize("")]
        [HttpGet]
        [Route("ping/secure")]
        public string PingSecured() => $"All good: {User.Identity.Name}. You only get this message if you are authenticated.";

        [HttpGet]
        [Route("ping/path")]
        public ActionResult PingPath(string ordernumber,string path)
        {

            var mapPath = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            var pathFull = Path.GetFullPath(Assembly.GetEntryAssembly().Location);
            var newpathRoot = Directory.GetCurrentDirectory();
            var currentDirectory = Environment.CurrentDirectory;
            var domainPath = AppDomain.CurrentDomain.BaseDirectory;
            var contextdirectory = AppContext.BaseDirectory;

            var mapPath2 = "/" + _awsService.GetRootFolder();//result /app
            var startPath = mapPath + "/Files/" + ordernumber;
            var zipOutput = mapPath + "/FilesOutput/" + ordernumber;
            var zipPath = zipOutput + "/STL_FILES_" + ordernumber + ".zip";

            System.IO.File.Exists(startPath);
            return Ok(new
            {
                Map = mapPath,
                FullPath= pathFull,
                Root = newpathRoot,
                currentDirectory,
                domainPath,
                contextdirectory,
                envPath = _awsService.GetRootFolder(),
                FileExist1 = Directory.Exists(startPath),
                FileExist2 = Directory.Exists(zipOutput),
                FileExist3 = System.IO.File.Exists(zipPath),

            });

        }
    }
}