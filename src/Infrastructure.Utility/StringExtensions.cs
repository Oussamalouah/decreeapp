using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Utility
{
    public static class StringExtensions
    {
        public static string FirstCharToUpper(this string input)
        {
            switch (input)
            {
                case null: throw new ArgumentNullException(nameof(input));
                case "": throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input));
                default: return input.Trim().FirstOrDefault().ToString().ToUpper() + (input.Length > 1 ? input.Trim().Substring(1) : "" );
            }
        }
    }
}
