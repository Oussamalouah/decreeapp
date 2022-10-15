namespace Decree.Stationery.Ecommerce.Core.Application.Services
{
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Decree.Stationery.Ecommerce.Core.Application.Messages.ShopifyWebhook;

    public interface IOrderTakerService
    {
        Task UploadStlFileToShopifyOrderAsync(ShopifyOrderDto order, Dictionary<string, string> requestHeaders, string requestBody);

        Task UpdateWebhookUrl(string apiUrl, string type);

        Task<List<CustomerAddressDto>> UploadCustomerAddress(string customerId, UploadFileMessage file);

        Task<List<CustomerAddressDto>> GetCustomerAddresses(string customerId);

        Task<CustomerAddressDto> GetCustomerAddress(Guid id);

        Task<string> GetShopifyCustomerId(string emailAddress);

        Task<CustomerAddressDto> AddCustomerAddress(string customerId, CustomerAddressDto data);

        Task<CustomerAddressDto> UpdateCustomerAddress(Guid id, CustomerAddressDto data);

        Task DeleteCustomerAddress(Guid id);

        void SendContactUs(ContactUsMessage message);

        void AddEmailSubscription(string email, string code, string token);

        dynamic GetRefreshToken(string refreshToken);

        dynamic GetAccessToken(string code);

        dynamic GetNewRefreshToken();

        Task<CustomerDto> GetCustomerByCustomerId(string customerId);

        Task<GroupDto> GetCustomerGroup(string customerId, string groupId);

        Task<CustomerDto> GetCustomer(string id);

        Task<List<GroupDto>> GetCustomerGroupsByCustomerId(string customerId);

        Task<CustomerDto> AddCustomerGroup(string customerId, GroupDto group);

        Task RemoveCustomerGroup(string customerId, string groupId);

        Task RemoveCustomer(string customerId);

        Task<CustomerDto> UpdateCustomerGroup(string customerId, string groupId, GroupDto group);

        Task<List<CustomerAddressDto>> GetCustomerAddresses(string customerId, List<string> groupId = null, List<string> addressContacts = null);

        Task<List<string>> GetOrdersOrderNumber(DateTime from, DateTime to);
    }
}