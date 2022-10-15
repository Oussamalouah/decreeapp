namespace Decree.Stationery.Ecommerce.Infrastructure.Server
{
    using AutoMapper;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Decree.Stationery.Ecommerce.Core.Domain.Models;
    using Decree.Stationery.Ecommerce.Infrastructure.Server.Models;

    public class MessageMappingProfile : Profile
    {
        public MessageMappingProfile()
        {
            CreateMap<CustomerAddressModel, CustomerAddressDto>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.ShopifyCustomerAddressId, opt => opt.Ignore())
                .ForMember(x => x.CountryCode, opt => opt.Ignore())
                .ForMember(x => x.CountryName, opt => opt.Ignore())
                .ForMember(x => x.SpecialDates, opt => opt.Ignore())
                .ForMember(x => x.FamilyMembers, opt => opt.Ignore())
                .ForMember(x => x.DateCreated, opt => opt.Ignore())
                .ForMember(x => x.CustomerId, opt => opt.Ignore()).DisableCtorValidation();

            CreateMap<ICustomerAddress, CustomerAddressDto>().ReverseMap().DisableCtorValidation();
            CreateMap<CustomerAddress, CustomerAddressDto>().ReverseMap().DisableCtorValidation();
            CreateMap<Date, DateDto>().ReverseMap().DisableCtorValidation();
            CreateMap<IDate, DateDto>().ReverseMap().DisableCtorValidation();
            CreateMap<Member, MemberDto>().ReverseMap().DisableCtorValidation();
            CreateMap<IMember, MemberDto>().ReverseMap().DisableCtorValidation();

            CreateMap<CustomerModel, CustomerDto>()
               .ForMember(x => x.Id, opt => opt.Ignore())
               .ForMember(x => x.Groups, opt => opt.Ignore())
               .ForMember(x => x.DateCreated, opt => opt.Ignore())
               .ForMember(x => x.CustomerId, opt => opt.Ignore()).DisableCtorValidation();

            CreateMap<ICustomer, CustomerDto>().ReverseMap().DisableCtorValidation();
            CreateMap<Customer, CustomerDto>().ReverseMap().DisableCtorValidation();
            CreateMap<Group, GroupDto>().ForMember(x => x.CustomerAddressesWithNames, opt => opt.Ignore()).ReverseMap().DisableCtorValidation();
            CreateMap<IGroup, GroupDto>().ForMember(x => x.CustomerAddressesWithNames, opt => opt.Ignore()).ReverseMap().DisableCtorValidation();
        }
    }
}