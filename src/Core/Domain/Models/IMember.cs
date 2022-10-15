namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;
    using System.Collections.Generic;

    public interface IMember
    {
        string Type { get; set; }
        string FirstName { get; set; }
        string MiddleName { get; set; }
        string LastName { get; set; }
        string Title { get; set; }
        List<Date> Dates { get; set; }
    }
}