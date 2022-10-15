namespace Decree.Stationery.Ecommerce.Core.Domain.Services
{
    using Decree.Stationery.Ecommerce.Core.Domain.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICustomerRepository
    {
        Task<ICustomer> Get(Guid id);
        Task<ICustomer> GetByName(string name);
        Task<IList<ICustomer>> GetAll();
        Task<ICustomer> GetByCustomerId(string customerId);
        Task<ICustomer> AddAsync(ICustomer CustomerAddress);
        Task<ICustomer> Save(ICustomer address);
        Task Delete(Guid id);
    }
}