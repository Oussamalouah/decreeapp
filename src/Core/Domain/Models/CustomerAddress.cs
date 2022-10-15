namespace Decree.Stationery.Ecommerce.Core.Domain.Models
{
    using System;
    using System.Collections.Generic;

    public class CustomerAddress : ICustomerAddress
    {
        public CustomerAddress() { }

        public virtual string Id { get; set; }

        public virtual string CustomerId { get; set; }

        public virtual  string ShopifyCustomerAddressId { get; set; }

        public virtual  string FirstName { get; set; }

        public virtual  string MiddleName { get; set; }

        public virtual  string LastName { get; set; }

        public virtual  string Title { get; set; }

        public virtual  string Company { get; set; }

        public virtual  string Address1 { get; set; }

        public virtual  string Address2 { get; set; }

        public virtual  string Country { get; set; }

        public virtual  string CountryCode { get; set; }

        public virtual  string CountryName { get; set; }

        public virtual  string Postal { get; set; }

        public virtual  string Phone { get; set; }

        public virtual  string City { get; set; }

        public virtual  string State { get; set; }

        public virtual  string EmailAddress { get; set; }

        public virtual List<Date> SpecialDates { get; set; }

        public virtual List<Member> FamilyMembers { get; set; }

        public virtual  DateTime DateCreated { get; set; }
    }
}