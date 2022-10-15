using System;
using System.Collections.Generic;

namespace Decree.Stationery.Ecommerce.Core.Application.Messages
{
    public class CustomerAddressDto
    {
        public string Id { get; set; }

        public string CustomerId { get; set; }
        
        public string ShopifyCustomerAddressId { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Title { get; set; }

        public string Company { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Country { get; set; }

        public string CountryCode { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string CountryName { get; set; }

        public string Postal { get; set; }

        public string Phone { get; set; }

        public string EmailAddress { get; set; }

        public List<DateDto> SpecialDates { get; set; }

        public List<MemberDto> FamilyMembers { get; set; }

        public DateTime DateCreated { get; set; }
    }
}