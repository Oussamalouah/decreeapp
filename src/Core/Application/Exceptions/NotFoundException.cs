namespace Decree.Stationery.Ecommerce.Core.Application.Exceptions
{
    using System;

    public class NotFoundException : Exception
    {
        public NotFoundException(string message, Exception innerException = null)
            : base(message, innerException) { }
    }
}