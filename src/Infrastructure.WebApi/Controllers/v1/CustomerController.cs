namespace Decree.Stationery.Ecommerce.Infrastructure.WebApi.Controllers.v1
{
    using System;
    using Decree.Stationery.Ecommerce.Core.Application.Services;
    using Decree.Stationery.Ecommerce.Infrastructure.WebApi.Controllers.v1.Bases;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System.Threading.Tasks;
    using Decree.Stationery.Ecommerce.Core.Application.Messages.ShopifyWebhook;
    using System.IO;
    using System.Collections.Specialized;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Newtonsoft.Json;
    using Decree.Stationery.Ecommerce.Core.Application.Exceptions;
    using Microsoft.AspNetCore.Http;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;

    [ApiController]
    [Route("api/v1/[controller]")]
    public class CustomerController : DecreeBaseController
    {
        private ILogger _logger;
        private readonly IOrderTakerService _orderService;

        public CustomerController(
            IOrderTakerService orderService,
            ILogger<OrderController> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _orderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
        }

        [HttpPost, Route("{customerId}/address/upload")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> UploadCustomerAddress(string customerId, IFormFile file)
        {
            if (file == null)
            {
                throw new NotFoundException("File not found");
            }

            var fileExtension = Path.GetExtension(file.FileName);
            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);
            var arr = ms.ToArray();

            try
            {
                var results = await _orderService.UploadCustomerAddress(customerId, new UploadFileMessage()
                {
                    FileContent = arr,
                    FileName = Guid.NewGuid().ToString() + fileExtension,
                    Type = file.ContentType,
                    Folder = ""
                });
                return Created("addresses", results);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost, Route("{customerId}/address")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> AddCustomerAddress(string customerId,[FromBody] CustomerAddressDto address)
        {
            var result = await _orderService.AddCustomerAddress(customerId, address);
            return Created("create_address", result);
        }

        [HttpPut, Route("{id}/address")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> UpdateCustomerAddress(Guid id, [FromBody] CustomerAddressDto address)
        {
            var result = await _orderService.UpdateCustomerAddress(id, address);
            return Ok(result);
        }

        [HttpDelete, Route("{id}/address")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> DeleteCustomerAddress(Guid id)
        {
            await _orderService.DeleteCustomerAddress(id);
            return Ok();
        }

        [HttpGet, Route("{customerId}/addresses")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> GetCustomerAddresses(string customerId)
        {
            var results = await _orderService.GetCustomerAddresses(customerId);
            return Ok(results);
        }

        [HttpGet, Route("{id}/address")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> GetCustomerAddress(Guid id)
        {
            var result = await _orderService.GetCustomerAddress(id);
            return Ok(result);
        }
        
        [HttpGet, Route("shopifycustomerid")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> GetCustomerId(string emailaddress)
        {
            var customerId = await _orderService.GetShopifyCustomerId(emailaddress);
            return Ok(new { customerId = customerId });
        }

        [HttpGet, Route("")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> GetCustomerByCustomerId(string customerId = null , string id = null)
        {
            var result = new CustomerDto();
            if (!string.IsNullOrEmpty(customerId))
            {
                result = await _orderService.GetCustomerByCustomerId(customerId);
            }
            else
            {
                result = await _orderService.GetCustomer(id);
            }

            return Ok(result);
        }

        [HttpDelete, Route("{customerId}")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> RemoveCustomer(string customerId)
        {
            await _orderService.RemoveCustomer(customerId);
            return Ok();
        }

        [HttpGet, Route("{customerId}/groups")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> GetCustomerGroupsByCustomerId(string customerId)
        {
            var result = await _orderService.GetCustomerGroupsByCustomerId(customerId);
            return Ok(result);
        }

        [HttpGet, Route("{customerId}/group/{groupId}")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> GetCustomerGroupByGroupId(string customerId, string groupId)
        {
            var result = await _orderService.GetCustomerGroup(customerId, groupId);
            return Ok(result);
        }

        [HttpPost, Route("{customerId}/group")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> AddCustomerGroup(string customerId, [FromBody] GroupDto group)
        {
            var result = await _orderService.AddCustomerGroup(customerId, group);
            return Created("create_group", result);
        }

        [HttpDelete, Route("{customerId}/group/{groupId}")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> RemoveCustomerGroup(string customerId, string groupId)
        {
            await _orderService.RemoveCustomerGroup(customerId, groupId);
            return Ok();
        }

        [HttpPut, Route("{customerId}/group/{groupId}")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> UpdateCustomerGroup(string customerId, string groupId, [FromBody] GroupDto group)
        {
            await _orderService.UpdateCustomerGroup(customerId, groupId, group);
            return Ok();
        }

        [HttpGet, Route("{customerId}/addresses/filter")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> GetCustomerAddressesFilter(string customerId, [FromQuery] QueryCustomerAddresses addresses)
        {
            var results = await _orderService.GetCustomerAddresses(customerId, addresses.GroupIds, addresses.AddressContacts);
            return Ok(results);
        }
    }
}
