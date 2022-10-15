namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;

    public interface IDate
    {
        string Type { get; set; }
        string Month { get; set; }
        string Day { get; set; }
        string Year { get; set; }
    }
}