using System;
using System.Collections.Generic;

namespace Infrastructure.Utility
{
    public class MailTemplateParser
    {
        public static void ParseSubjectAndBody(Dictionary<string, string> bodyValues, ref string subject, ref string body)
        {
            if (bodyValues != null)
            {
                foreach (var key in bodyValues.Keys)
                {
                    body = body.Replace(string.Format("<<{0}>>", key), bodyValues[key] ?? string.Empty);
                    subject = subject.Replace(string.Format("<<{0}>>", key), bodyValues[key] ?? string.Empty);
                }
            }
        }
    }
}
