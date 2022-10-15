using System.Collections.Generic;

namespace Decree.Stationery.Ecommerce.Core.Application.Messages
{
    public class MemberDto
    {
        public string Type { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public List<DateDto> Dates { get; set; }
    }
}