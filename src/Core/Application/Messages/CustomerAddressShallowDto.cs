using System;
using System.Collections.Generic;

namespace Decree.Stationery.Ecommerce.Core.Application.Messages
{
    public class CustomerAddressShallowDto
    {
        public string Id { get; set; }

        public string CustomerId { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Title { get; set; }
    }
}