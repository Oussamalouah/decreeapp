namespace Decree.Stationery.Ecommerce.Infrastructure.Notification.SendGrid
{
    using System;
    using System.Collections.Generic;
    using Decree.Stationery.Ecommerce.Core.Domain.Services;

    public class NotificationService : INotificationService
    {
        public void SendMessage(string recipient, string message)
        {
            throw new NotImplementedException();
        }

        public void SendMessage(IList<string> recipients, string message)
        {
            throw new NotImplementedException();
        }
    }
}