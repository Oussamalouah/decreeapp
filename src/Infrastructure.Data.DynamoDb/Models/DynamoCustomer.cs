namespace Decree.Stationery.Ecommerce.Infrastructure.Data.DynamoDb.Models
{
    using System;
    using MongoRepository.NetCore;
    using Decree.Stationery.Ecommerce.Core.Domain.Models;
    using Amazon.DynamoDBv2.DataModel;
    using System.Collections.Generic;

    [DynamoDBTable("Customer")]
    public class DynamoCustomer : Customer
    {
        public DynamoCustomer() { }

        [DynamoDBHashKey("Id")]
        public override string Id { get; set; }

        [DynamoDBProperty("CustomerId")]
        public override string CustomerId { get; set; }

        [DynamoDBProperty("Name")]
        public override string Name { get; set; }

        [DynamoDBProperty("Groups")]
        public override List<Group> Groups { get; set; }

        [DynamoDBProperty("DateCreated")]
        public override DateTime DateCreated { get; set; }
    }
}