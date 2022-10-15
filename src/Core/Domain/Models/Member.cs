namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;
    using System.Collections.Generic;

    public class Member : IMember
    {
        public string Type { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public List<Date> Dates { get; set; }
    }
}