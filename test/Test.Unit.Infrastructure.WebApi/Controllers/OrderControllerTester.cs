namespace Test.Unit.Infrastructure.WebApi.Controllers
{
    using Decree.Stationery.Ecommerce.Core.Application.Services;
    using Decree.Stationery.Ecommerce.Infrastructure.WebApi.Controllers.v1;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using NSubstitute;
    using NUnit.Framework;
    using Test.Unit.Infrastructure.WebApi.Controllers.Bases;

    [TestFixture]
    public class OrderControllerTester : ControllerTesterTemplate<OrderController>
    {
        IOrderTakerService _orderTaker;
        ILogger<OrderController> _logger;

        protected override OrderController EstablishContext()
        {
            _orderTaker = Substitute.For<IOrderTakerService>();
            _logger = Substitute.For<ILogger<OrderController>>();
            return new OrderController(_orderTaker, _logger);
        }

        protected override void TestCleanup()
        {
            _orderTaker.ClearReceivedCalls();
            _logger.ClearReceivedCalls();
        }

        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
        }

        [Test]
        public void CanConstructNotesController()
        {
            // ARRANGE
            var orderTaker = Substitute.For<IOrderTakerService>();
            var logger = Substitute.For<ILogger<OrderController>>();

            // ACT
            var subjectUnderTest = new OrderController(orderTaker, logger);

            // ASSERT
            Assert.That(subjectUnderTest, Is.Not.Null);
            Assert.That(subjectUnderTest, Is.TypeOf(typeof(OrderController)));
        }
    }
}
