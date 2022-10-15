using Amazon.DynamoDBv2.Model;
using Decree.Stationery.Ecommerce.Core.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Data.DynamoDb.Extensions
{
    public static class Extension
    {
        public static List<CustomerAddress> ToCustomerAddresses(this List<Dictionary<string, AttributeValue>> values)
        {
            var results = new List<CustomerAddress>();

            foreach (var item in values)
            {
                var data = new CustomerAddress
                {
                    Address1 = item?.GetValueOrDefault("Address1")?.S ?? "",
                    Address2 = item?.GetValueOrDefault("Address2")?.S ?? "",
                    City = item?.GetValueOrDefault("City")?.S ?? "",
                    Company = item?.GetValueOrDefault("Company")?.S ?? "",
                    Country = item?.GetValueOrDefault("Country")?.S ?? "",
                    CountryCode = item?.GetValueOrDefault("CountryCode")?.S ?? "",
                    CountryName = item?.GetValueOrDefault("CountryName")?.S ?? "",
                    CustomerId = item?.GetValueOrDefault("CustomerId")?.S ?? "",
                    DateCreated = DateTime.Parse(item?.GetValueOrDefault("DateCreated")?.S ?? "2000-01-01"),
                    EmailAddress = item?.GetValueOrDefault("EmailAddress")?.S ?? "",
                    FirstName = item?.GetValueOrDefault("FirstName")?.S ?? "",
                    Id = item?.GetValueOrDefault("Id")?.S ?? "",
                    LastName = item?.GetValueOrDefault("LastName")?.S ?? "",
                    MiddleName = item?.GetValueOrDefault("MiddleName")?.S ?? "",
                    Phone = item?.GetValueOrDefault("Phone")?.S ?? "",
                    Postal = item?.GetValueOrDefault("Postal")?.S ?? "",
                    ShopifyCustomerAddressId = item?.GetValueOrDefault("ShopifyCustomerAddressId")?.S ?? "",
                    State = item?.GetValueOrDefault("State")?.S ?? "",
                    Title = item?.GetValueOrDefault("Title")?.S ?? "",
                    SpecialDates = (item?.GetValueOrDefault("SpecialDates")?.L?? new List<AttributeValue>())
                                    .Select(x => new Date() { 
                                        Day = x.M.GetValueOrDefault("Day")?.S ?? "",
                                        Month = x.M.GetValueOrDefault("Month")?.S ?? "",
                                        Type = x.M.GetValueOrDefault("Type")?.S ?? "",
                                        Year = x.M.GetValueOrDefault("Year")?.S ?? ""
                                    }).ToList(),

                    FamilyMembers = (item?.GetValueOrDefault("FamilyMembers")?.L ?? new List<AttributeValue>())
                                    .Select(x => new Member()
                                    {
                                        FirstName = x.M.GetValueOrDefault("FirstName")?.S ?? "",
                                        LastName = x.M.GetValueOrDefault("LastName")?.S ?? "",
                                        MiddleName = x.M.GetValueOrDefault("MiddleName")?.S ?? "",
                                        Type = x.M.GetValueOrDefault("Type")?.S ?? "",
                                        Title = x.M.GetValueOrDefault("Title")?.S ?? "",
                                        Dates = (x?.M.GetValueOrDefault("Dates")?.L ?? new List<AttributeValue>())
                                                    .Select(z => new Date()
                                                    {
                                                        Day = z.M.GetValueOrDefault("Day")?.S ?? "",
                                                        Month = z.M.GetValueOrDefault("Month")?.S ?? "",
                                                        Type = z.M.GetValueOrDefault("Type")?.S ?? "",
                                                        Year = z.M.GetValueOrDefault("Year")?.S ?? ""
                                                    }).ToList()
                                    }).ToList(),
                };

                results.Add(data);
            }

            return results;
        }

        public static List<Customer> ToCustomers(this List<Dictionary<string, AttributeValue>> values)
        {
            var results = new List<Customer>();

            foreach (var item in values)
            {
                var data = new Customer
                {
                    CustomerId = item?.GetValueOrDefault("CustomerId")?.S ?? "",
                    Name = item?.GetValueOrDefault("Name")?.S ?? "",
                    DateCreated = DateTime.Parse(item?.GetValueOrDefault("DateCreated")?.S ?? "2000-01-01"),
                    Id = item?.GetValueOrDefault("Id")?.S ?? "",
                    Groups = (item?.GetValueOrDefault("Groups")?.L ?? new List<AttributeValue>())
                                    .Select(x => new Group()
                                    {
                                        Id = x.M.GetValueOrDefault("Id")?.S ?? "",
                                        Name = x.M.GetValueOrDefault("Name")?.S ?? "",
                                        CustomerAddresses = (x?.M.GetValueOrDefault("CustomerAddresses")?.SS ?? new List<string>())
                                                    .Select(z => z ?? "").ToList()
                                    }).ToList(),
                };

                results.Add(data);
            }

            return results;
        }
    }
}
