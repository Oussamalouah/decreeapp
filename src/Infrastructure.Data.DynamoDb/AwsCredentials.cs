using Amazon.Runtime;
using Decree.Stationery.Ecommerce.Core.Domain.Models;
namespace Infrastructure.Data.DynamoDb
{
	public class AwsCredentials : AWSCredentials
	{
		private readonly AppConfig _appConfig;

		public AwsCredentials(AppConfig appConfig)
		{
			_appConfig = appConfig;
		}

		public override ImmutableCredentials GetCredentials()
		{
			return new ImmutableCredentials(_appConfig.AwsAccessKey,
							_appConfig.AwsSecretKey, null);
		}
	}
}
