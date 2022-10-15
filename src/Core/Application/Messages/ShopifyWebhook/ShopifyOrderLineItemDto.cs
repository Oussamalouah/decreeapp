namespace Decree.Stationery.Ecommerce.Core.Application.Messages.ShopifyWebhook
{
    public class ShopifyOrderLineItemDto
    {
        public long id { get; set; }
        public string title { get; set; }
        public string name { get; set; }
    }
}
