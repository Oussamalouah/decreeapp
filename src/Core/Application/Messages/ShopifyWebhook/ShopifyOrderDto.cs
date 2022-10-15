namespace Decree.Stationery.Ecommerce.Core.Application.Messages.ShopifyWebhook
{
    using System.Collections.Generic;
    public class ShopifyOrderDto
    {
        public long id { get; set; }

        public long order_number { get; set; }

        public List<ShopifyOrderLineItemDto> line_items { get; set; }
    }
}
