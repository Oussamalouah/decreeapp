namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;
    using System.Collections.Generic;

    public interface ICustomer
    {
        string Id { get; set; }

        string CustomerId { get; set; }

        string Name { get; set; }

        List<Group> Groups { get; set; }

        DateTime DateCreated { get; }
    }
}