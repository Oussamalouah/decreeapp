namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{

    public class Date : IDate
    {
        public string Type { get; set; }
        public string Month { get; set; }
        public string Day { get; set; }
        public string Year { get; set; }
    }
}