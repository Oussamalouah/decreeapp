using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Notification.ConstantContact.Models
{
    public class AuthorizationModel
    {
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        public string token_type { get; set; }

    }
}
