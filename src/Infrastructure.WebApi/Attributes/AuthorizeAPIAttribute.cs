using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.WebApi.Attributes
{
    public class AuthorizeAPIAttribute : AuthorizeAttribute
    {
        public AuthorizeAPIAttribute()
        {
        }

        
    }
}
