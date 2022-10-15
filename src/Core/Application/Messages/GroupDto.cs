using System;
using System.Collections.Generic;

namespace Decree.Stationery.Ecommerce.Core.Application.Messages
{
    public class GroupDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<string> CustomerAddresses { get; set; }
        public List<CustomerAddressShallowDto> CustomerAddressesWithNames { get; set; }
    }
}