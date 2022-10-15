namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;
    using System.Collections.Generic;

    public class Group : IGroup
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<string> CustomerAddresses { get; set; }
    }
}
