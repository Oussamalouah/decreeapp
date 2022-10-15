namespace Decree.Stationery.Ecommerce.Infrastructure.Notification.ConstantContact
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Mail;
    using System.Text.Json;
    using System.Threading.Tasks;
    using Decree.Stationery.Ecommerce.Core.Application.Messages;
    using Decree.Stationery.Ecommerce.Core.Domain.Services;
    using global::Infrastructure.Notification.ConstantContact.Models;
    using RestSharp;

    public class NotificationService : INotificationService
    {
        private readonly string _apiKey = "";
        private readonly string _secreyKey = "";
        private readonly string _baseUrl = "";

        private string _mailServer;
        private int _portNo;
        private string _smtpUsername;
        private string _smtpPassword;
        private readonly string _fromName= "";
        private readonly string _fromEmail = "";
        private readonly string _replyToEmail = "";
        private readonly string _redirectUri = "";
        public NotificationService(
                            string baseUrl, 
                            string apiKey, 
                            string secreyKey, 
                            string fromName, 
                            string fromEmail, 
                            string replyToEmail,
                            string mailServer,
                            string portNo,
                            string smtpUsername,
                            string smtpPassword,
                            string redurectUri)
        {
            _baseUrl = baseUrl;
            _apiKey = apiKey;
            _secreyKey = secreyKey;
            _fromName = fromName;
            _fromEmail = fromEmail;
            _replyToEmail = replyToEmail;
            _mailServer = mailServer;
            _portNo = int.Parse(portNo);
            _smtpUsername = smtpUsername;
            _smtpPassword = smtpPassword;
            _redirectUri = redurectUri;
        }

        public void SendMessage(string recipient, string message)
        {
            
        }

        public string ValidateToken(string accessCode)
        {
            var startupPath = AppContext.BaseDirectory;

            var fileName = startupPath + "/Token.txt";
            var data = "";
            var token = "";

            if (string.IsNullOrEmpty(accessCode))
            {
                if (File.Exists(fileName))
                {
                    var textResult = File.ReadAllText(fileName);
                    var parseResult = JsonSerializer.Deserialize<AuthorizationModel>(textResult);
                    var refreshTokenResult = GetRefreshAccessToken(parseResult.refresh_token);
                    data = JsonSerializer.Serialize(refreshTokenResult);
                    token = refreshTokenResult.access_token;
                }
                else
                {
                    throw new Exception("Need to request new token");
                }
            }
            else
            {
                var result = GetAccessToken(accessCode);
                data = JsonSerializer.Serialize(result);
                token = result.access_token;
            }

            File.WriteAllText(fileName, data);
            return token;
        }

        private AuthorizationModel GetAccessToken(string accessCode)
        {
            string authorization_code = accessCode;
            var client = new RestClient("https://authz.constantcontact.com/oauth2/default/v1/token?code=" + authorization_code + "&redirect_uri="+_redirectUri+ "&grant_type=authorization_code");
            var request = new RestRequest(Method.POST);

            string credentials = _apiKey + ":" + _secreyKey;
            byte[] plain = System.Text.Encoding.UTF8.GetBytes(credentials);
            var base64cred = Convert.ToBase64String(plain);
            var base64auth = "Basic " + base64cred;
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddHeader("authorization", base64auth);

            IRestResponse response = client.Execute(request);
            if(response.StatusCode != HttpStatusCode.OK)
            {
                throw new Exception(response.Content);
            }
            var data = JsonSerializer.Deserialize<AuthorizationModel>(response.Content);
            return data;
        }

        private AuthorizationModel GetRefreshAccessToken(string accessCode)
        {
            string authorization_code = accessCode;
            var client = new RestClient("https://authz.constantcontact.com/oauth2/default/v1/token?refresh_token=" + authorization_code + "&redirect_uri=" + _redirectUri + "&grant_type=refresh_token");
            var request = new RestRequest(Method.POST);

            string credentials = _apiKey + ":" + _secreyKey;
            byte[] plain = System.Text.Encoding.UTF8.GetBytes(credentials);
            var base64cred = Convert.ToBase64String(plain);
            var base64auth = "Basic " + base64cred;
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddHeader("authorization", base64auth);

            IRestResponse response = client.Execute(request);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new Exception(response.Content);
            }
            var data = JsonSerializer.Deserialize<AuthorizationModel>(response.Content);
            return data;
        }

        public void SendEmail(EmailMessage message)
        {
            if (string.IsNullOrEmpty(_mailServer))
            {
                throw new ArgumentException("'SMTP Server' field cannot be blank.", "SMTP Server");
            }

            if (string.IsNullOrEmpty(message.Recipient))
            {
                throw new ArgumentException("'To' field cannot be blank", "Recipient");
            }

            if (string.IsNullOrEmpty(_fromEmail))
            {
                throw new ArgumentException("'From' field cannot be blank", "Sender");
            }

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(_fromEmail, _fromName);

            string[] toArray = null;
            if (message.Recipient.Contains(';'))
            {
                toArray = message.Recipient.Split(';');
            }
            else
            {
                toArray = new string[] { message.Recipient };
            }

            foreach (var toEmail in toArray)
            {
                if (toEmail.Trim() != string.Empty)
                {
                    mailMessage.To.Add(new MailAddress(toEmail.Trim()));
                }
            }

            mailMessage.ReplyTo = new MailAddress(_replyToEmail);
            mailMessage.Subject = message.Subject;

            if (message.IsHtmlEmail)
            {
                AlternateView htmlView = AlternateView.CreateAlternateViewFromString(message.Body, null, "text/html");
                mailMessage.AlternateViews.Add(htmlView);
            }
            else
            {
                AlternateView plainTextView = AlternateView.CreateAlternateViewFromString(message.Body, null, "text/plain");
                mailMessage.AlternateViews.Add(plainTextView);
            }

            mailMessage.IsBodyHtml = message.IsHtmlEmail;

            SmtpClient smtpClient = new SmtpClient(_mailServer)
            {
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            if (_portNo != 0) smtpClient.Port = _portNo;
            if (!string.IsNullOrEmpty(_smtpUsername))
            {
                smtpClient.Credentials = new NetworkCredential(_smtpUsername, _smtpPassword);
            }
            else
            {
                smtpClient.UseDefaultCredentials = false;
            }

            if ((message.Attachments != null) && (message.Attachments.Any()))
            {
                foreach (var attachment in message.Attachments)
                {
                    mailMessage.Attachments.Add(attachment);
                }
            }

            try
            {
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                mailMessage.Dispose();
                smtpClient.Dispose();
            }
        }

        public void SendMessage(IList<string> recipients, string message)
        {
            throw new NotImplementedException();
        }

        public void AddEmailSubscription(string email, string code, string token)
        {
            var accessToken = "";
            
            accessToken = ValidateToken(code);
            
            if(!string.IsNullOrEmpty(token))
            {
                accessToken = token;
            }

            var client = new RestClient(_baseUrl+"/contacts");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("accept", "application/json");
            request.AddHeader("authorization", "Bearer "+ accessToken);
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("content-type", "application/json");
            request.AddParameter("application/json", "{\n  \"email_address\": {\n    \"address\": \""+ email + "\",\n    \"permission_to_send\": \"implicit\"\n  },\n  \"create_source\": \"Account\"\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            if(response.StatusCode != HttpStatusCode.Created)
            {
                throw new Exception(response.Content);
            }
        }

        public string GetFromEmail()
        {
            return _fromEmail;
        }

        public dynamic GetAuthorization(string code)
        {
            return GetAccessToken(code);
        }

        public dynamic GetRefreshToken(string refreshToken)
        {
            return GetRefreshAccessToken(refreshToken);
        }
    }
}