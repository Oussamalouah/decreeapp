using System;
using System.Collections.Generic;

namespace Decree.Stationery.Ecommerce.Core.Application.Messages
{
    public class CustomerDto
    {
        public string Id { get; set; }

        public string CustomerId { get; set; }
         
        public string Name { get; set; }

        public List<GroupDto> Groups { get; set; }

        public DateTime DateCreated { get; set; }
    }
}