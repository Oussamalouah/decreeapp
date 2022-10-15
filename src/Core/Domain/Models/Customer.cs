namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;
    using System.Collections.Generic;

    public class Customer : ICustomer
    {
        public Customer() { }

        public virtual string Id { get; set; }

        public virtual string CustomerId { get; set; }

        public virtual string Name { get; set; }

        public virtual List<Group> Groups { get; set; }

        public virtual DateTime DateCreated { get; set; }
    }
}