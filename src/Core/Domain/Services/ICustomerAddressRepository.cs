namespace Decree.Stationery.Ecommerce.Core.Domain.Services
{
    using Decree.Stationery.Ecommerce.Core.Domain.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICustomerAddressRepository
    {
        Task<ICustomerAddress> Get(Guid id);
        Task<ICustomerAddress> GetByShopifyCustomerAddressId(string id);
        Task<ICustomerAddress> GetByName(string name);
        Task<IList<ICustomerAddress>> GetAll();
        Task<IList<ICustomerAddress>> GetAllByCustomerId(string customerId);
        Task<ICustomerAddress> AddAsync(ICustomerAddress CustomerAddress);
        Task<ICustomerAddress> Save(ICustomerAddress address);
        Task Delete(Guid id);
        Task DeleteByShopifyCustomerAddressId(string customerAddressId);
    }
}