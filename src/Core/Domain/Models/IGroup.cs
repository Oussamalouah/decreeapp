namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;
    using System.Collections.Generic;

    public interface IGroup
    {
        string Id { get; set; }
        string Name { get; set; }
        List<string> CustomerAddresses { get; set; }
    }
}