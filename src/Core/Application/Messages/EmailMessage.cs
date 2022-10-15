using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace Decree.Stationery.Ecommerce.Core.Application.Messages
{
    public class EmailMessage
    {
        public string Recipient { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHtmlEmail { get; set; }
        public Attachment[] Attachments { get; set; }
    }
}
