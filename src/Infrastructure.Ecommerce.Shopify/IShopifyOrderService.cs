namespace Decree.Stationery.Ecommerce.Infrastructure.Ecommerce.Shopify
{
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Decree.Stationery.Ecommerce.Core.Application.Messages.ShopifyWebhook;
    using Microsoft.Extensions.Primitives;
    using ShopifySharp;
    using ShopifySharp.Lists;
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.IO;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;

    public interface IShopifyOrderService
    {
        Task UpdateOrderStlFile(string orderNumber, string filePath);

        Task UpdateOrderNoteAttribute(long orderId, Dictionary<string,string> attributes);

        Task<Order> GetShopifyOrder(long orderId);

        Task UpdateShopifyCreateOrderWebhookUrl(string apiUrl);

        bool IsWebookAuthenticated(IEnumerable<KeyValuePair<string, StringValues>> requestHeaders, string requestBody);

        Task<Address> GetCustomerAddress(string customerId, string customerAddressId);

        Task<string> GetCustomerId(string emailAddress);

        Task<ListResult<Address>> GetCustomerAddresses(string customerId);

        Task<CustomerAddressDto> InsertCustomerAddress(string customerId, CustomerAddressDto data);

        Task<List<CustomerAddressDto>> InsertCustomerAddresses(string customerId, List<CustomerAddressDto> data);

        Task<Address> UpdateCustomerAddress(string customerId, string customerAddressId, CustomerAddressDto data);

        Task RemoveCustomerAddress(string customerId, string customerAddressId);

        Task<List<string>> GetOrdersOrderNumber(DateTime from , DateTime to);
    }
}