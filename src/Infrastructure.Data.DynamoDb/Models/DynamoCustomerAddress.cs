namespace Decree.Stationery.Ecommerce.Infrastructure.Data.DynamoDb.Models
{
    using System;
    using MongoRepository.NetCore;
    using Decree.Stationery.Ecommerce.Core.Domain.Models;
    using Amazon.DynamoDBv2.DataModel;
    using System.Collections.Generic;

    [DynamoDBTable("CustomerAddress")]
    public class DynamoCustomerAddress : CustomerAddress
    {
        public DynamoCustomerAddress() { }

        [DynamoDBHashKey("Id")]
        public override string Id { get; set; }

        [DynamoDBProperty("CustomerId")]
        public override string CustomerId { get; set; }

        [DynamoDBProperty("ShopifyCustomerAddressId")]
        public override string ShopifyCustomerAddressId { get; set; }

        [DynamoDBProperty("FirstName")]
        public override string FirstName { get; set; }

        [DynamoDBProperty("MiddleName")]
        public override string MiddleName { get; set; }

        [DynamoDBProperty("LastName")]
        public override string LastName { get; set; }

        [DynamoDBProperty("Title")]
        public override string Title { get; set; }

        [DynamoDBProperty("Company")]
        public override string Company { get; set; }

        [DynamoDBProperty("Address1")]
        public override string Address1 { get; set; }

        [DynamoDBProperty("Address2")]
        public override string Address2 { get; set; }

        [DynamoDBProperty("Country")]
        public override string Country { get; set; }

        [DynamoDBProperty("CountryCode")]
        public override string CountryCode { get; set; }

        [DynamoDBProperty("CountryCode")]
        public override string CountryName { get; set; }

        [DynamoDBProperty("Postal")]
        public override string Postal { get; set; }

        [DynamoDBProperty("Phone")]
        public override string Phone { get; set; }

        [DynamoDBProperty("City")]
        public override string City { get; set; }

        [DynamoDBProperty("State")]
        public override string State { get; set; }

        [DynamoDBProperty("EmailAddress")]
        public override string EmailAddress { get; set; }

        [DynamoDBProperty("SpecialDates")]
        public override List<Date> SpecialDates { get; set; }

        [DynamoDBProperty("FamilyMembers")]
        public override List<Member> FamilyMembers { get; set; }

        [DynamoDBProperty("DateCreated")]
        public override DateTime DateCreated { get; set; }
    }
}