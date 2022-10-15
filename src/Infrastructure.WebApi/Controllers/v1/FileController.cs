namespace Decree.Stationery.Ecommerce.Infrastructure.WebApi.Controllers.v1
{
    using System;
    using System.Collections.Generic;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Decree.Stationery.Ecommerce.Core.Application.Services;
    using Decree.Stationery.Ecommerce.Infrastructure.WebApi.Controllers.v1.Bases;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using System.Threading.Tasks;
    using Decree.Stationery.Ecommerce.Core.Application.Messages.ShopifyWebhook;
    using System.IO;
    using Decree.Stationery.Ecommerce.Core.Application.Exceptions;
    using System.Linq;

    [ApiController]
    [Route("api/v1/[controller]")]
    public class FileController : DecreeBaseController
    {
        private ILogger _logger;
        private readonly IFileService _fileService;

        public FileController(
            IFileService fileService,
            ILogger<OrderController> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _fileService = fileService ?? throw new ArgumentNullException(nameof(fileService));
        }

        [HttpPost, Route("svg")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> UpdateSVGFileAsync(IFormFile file)
        {
            if (file == null)
            {
                throw new NotFoundException("File not found");
            }

            var fileExtension = Path.GetExtension(file.FileName);
            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);

            var fileResult = await _fileService.UploadSVGFile(new UploadFileMessage()
            {
                FileContent = ms.ToArray(),
                FileName = Guid.NewGuid().ToString() + fileExtension,
                Type = file.ContentType
            });

            return Created("svg", fileResult);
        }

        [HttpPost, Route("icons")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> UpdateFilezIconsAsync(IFormFile file)
        {
            if (file == null)
            {
                throw new NotFoundException("File not found");
            }

            var fileExtension = Path.GetExtension(file.FileName);
            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);

            var fileResult = await _fileService.UploadFile(new UploadFileMessage()
            {
                FileContent = ms.ToArray(),
                FileName = Guid.NewGuid().ToString() + fileExtension,
                Type = file.ContentType,
                Folder = "icons\\"
            });

            return Created("icons", fileResult);
        }

        [HttpPost, Route("stlfiles")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> ReplaceSTLFiles(string url)
        {
            var files = Request.Form.Files;
            if (files == null || !files.Any())
            {
                throw new NotFoundException("File not found");
            }

            var listOfUploadedFiles = new List<UploadFileMessage>(); 
            foreach(var file in files){
                var fileExtension = Path.GetExtension(file.FileName);
                using (MemoryStream ms = new MemoryStream())
                {
                    file.CopyTo(ms);

                    listOfUploadedFiles.Add(new UploadFileMessage()
                    {
                        FileContent = ms.ToArray(),
                        FileName = file.FileName,
                        Type = file.ContentType,
                        Folder = ""
                    });
                }
            }

            await _fileService.ReplaceFilesInsideTheZip(url, listOfUploadedFiles);

            return Created("uploadstl", new { });
        }
    }
}