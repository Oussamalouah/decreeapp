using System.Collections.Generic;

namespace Decree.Stationery.Ecommerce.Core.Application.Messages
{
    public class QueryCustomerAddresses
    {
        public List<string> GroupIds { get; set; } = null;
        public List<string> AddressContacts { get; set; } = null;
    }
}