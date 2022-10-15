namespace Decree.Stationery.Ecommerce.Core.Application.Exceptions
{
    using System;

    public class InvalidContentTypeException : Exception
    {
        public InvalidContentTypeException(string message, Exception innerException = null)
            : base(message, innerException) { }
    }
}