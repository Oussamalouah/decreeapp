namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;
    using System.Collections.Generic;

    public interface ICustomerAddress
    {
        string Id { get; }

        string CustomerId { get; }

        string ShopifyCustomerAddressId { get; set; }

        string FirstName { get; set; }

        string MiddleName { get; set; }

        string LastName { get; set; }

        string Title { get; set; }

        string Company { get; set; }

        string Address1 { get; set; }

        string Address2 { get; set; }

        string Country { get; set; }

        string CountryCode { get; set; }

        string CountryName { get; set; }

        string Postal { get; set; }

        string Phone { get; set; }

        string City { get; set; }

        string State { get; set; }

        string EmailAddress { get; set; }

        List<Date> SpecialDates { get; set; }

        List<Member> FamilyMembers { get; set; }

        DateTime DateCreated { get; }
    }
}