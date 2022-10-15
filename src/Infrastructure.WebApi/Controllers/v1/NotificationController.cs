namespace Decree.Stationery.Ecommerce.Infrastructure.WebApi.Controllers.v1
{
    using System;
    using Decree.Stationery.Ecommerce.Core.Application.Services;
    using Decree.Stationery.Ecommerce.Infrastructure.WebApi.Controllers.v1.Bases;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System.Threading.Tasks;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Microsoft.Extensions.Configuration;

    [ApiController]
    [Route("api/v1/[controller]")]
    public class NotificationController : DecreeBaseController
    {
        private ILogger _logger;
        private readonly IOrderTakerService _orderService;
        public IConfiguration Configuration { get; }

        public NotificationController(
            IOrderTakerService orderService,
            ILogger<OrderController> logger,
            IConfiguration configuration)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _orderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
            Configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpPost, Route("email/contactus/send")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public async Task<IActionResult> SendContactUs([FromBody]ContactUsMessage message)
        {
            _orderService.SendContactUs(message);
            return Ok();
        }

        [HttpPost, Route("email/subscription/add")]
        [ProducesResponseType(typeof(OkResult), 201)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public  IActionResult AddEmailSubscription(string email, string authorizationCode = "", string accessToken = "")
        {
            _orderService.AddEmailSubscription(email, authorizationCode, accessToken);
            return Ok();
        }

        [HttpGet, Route("email/constantcontact/uri")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public IActionResult GetUri(string redirectUri = "https://localhost:44363")
        {
            var apikey = Environment.GetEnvironmentVariable("Decree_EmailApiKey") ?? (Configuration["EmailConfig:ApiKey"]?.ToString() ?? "");

            var accessTokenUrl = "https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=[ApiKey]&redirect_uri=[redirect_uri]&response_type=token&scope=contact_data+campaign_data+offline_access&state=1234";
            var authorizationCodeUrl = "https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=[ApiKey]&redirect_uri=[redirect_uri]&response_type=code&scope=contact_data+campaign_data+offline_access&state=1234";

            accessTokenUrl = accessTokenUrl.Replace("[redirect_uri]", redirectUri);
            authorizationCodeUrl = authorizationCodeUrl.Replace("[redirect_uri]", redirectUri);
            accessTokenUrl = accessTokenUrl.Replace("[ApiKey]", apikey);
            authorizationCodeUrl = authorizationCodeUrl.Replace("[ApiKey]", apikey);

            return Ok(new { 
                access_token_url = accessTokenUrl,
                authorization_code_url = authorizationCodeUrl
            });
        }

        [HttpGet, Route("email/constantcontact/refreshtoken")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public IActionResult GetRefreshToken(string refreshtoken)
        {
            var data = _orderService.GetRefreshToken(refreshtoken);
            return Ok(data);
        }


        [HttpGet, Route("email/constantcontact/accessToken")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public IActionResult GetAccessToken(string authorizationCode)
        {
             var data = _orderService.GetAccessToken(authorizationCode);
            return Ok(data);
        }

        [HttpGet, Route("email/constantcontact/refresnewtoken")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        public IActionResult RefreshToken()
        {
            var data = _orderService.GetNewRefreshToken();
            return Ok(data);
        }
    }
}
