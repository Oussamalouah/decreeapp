namespace Decree.Stationery.Ecommerce.Core.Domain.Services
{
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface INotificationService
    {
        void AddEmailSubscription(string email, string code, string token);

        void SendMessage(string recipient, string message);

        void SendMessage(IList<string> recipients, string message);

        void SendEmail(EmailMessage message);

        string GetFromEmail();

        dynamic GetAuthorization(string code);

        dynamic GetRefreshToken(string code);

        string ValidateToken(string accessCode);
    }
}