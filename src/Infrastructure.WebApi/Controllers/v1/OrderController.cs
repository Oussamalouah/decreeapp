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

    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrderController : DecreeBaseController
    {
        private ILogger _logger;
        private readonly IOrderTakerService _orderService;

        public OrderController(
            IOrderTakerService orderService,
            ILogger<OrderController> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _orderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
        }

        [HttpPost, Route("create/webhook")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> ShopifyCreateOrderWebhook()
        {
            Dictionary<string,string> headers = Request.Headers.ToDictionary(a => a.Key, a => string.Join(";", a.Value));
            var requestBody = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var shopifyOrder = JsonConvert.DeserializeObject<ShopifyOrderDto>(requestBody);
            await _orderService.UploadStlFileToShopifyOrderAsync(shopifyOrder, headers, requestBody);
            return Ok();
        }

        [HttpPost, Route("create/webhookurl")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> UpdateCreateOrderWebhookUrl(string apiUrl)
        {
            await _orderService.UpdateWebhookUrl(apiUrl, "CREATE_ORDER");
            return Ok();
        }

        [HttpGet, Route("ordernumbers")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> UpdateCreateOrderWebhookUrl(DateTime? from , DateTime? to)
        {
            if (!from.HasValue)
                from = DateTime.UtcNow.Date;
            if (!to.HasValue)
                to = DateTime.UtcNow;
            var orders = await _orderService.GetOrdersOrderNumber(from.Value, to.Value);
            return Ok(orders);
        }
    }
}