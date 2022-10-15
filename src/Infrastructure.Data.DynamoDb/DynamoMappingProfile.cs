namespace Decree.Stationery.Ecommerce.Infrastructure.Data.DynamoDb
{
    using System;
    using AutoMapper;
    using Decree.Stationery.Ecommerce.Core.Domain.Models;
    using Decree.Stationery.Ecommerce.Infrastructure.Data.DynamoDb.Models;
    using MongoDB.Bson.Serialization;

    public class DynamoMappingProfile : Profile
    {
        public DynamoMappingProfile()
        {
            //CreateMap<CustomerAddress, DynamoCustomerAddress>().ReverseMap().DisableCtorValidation();
            //CreateMap<CustomerAddress, DynamoCustomerAddress>().ReverseMap();
        }
    }
}