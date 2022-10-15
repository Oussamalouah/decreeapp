using Amazon;
using Amazon.DynamoDBv2;
using Decree.Stationery.Ecommerce.Core.Domain.Models;

namespace Infrastructure.Data.DynamoDb
{
    public class DynamoDbClientFactory
    {
		public static AmazonDynamoDBClient CreateClient(AppConfig appConfig)
		{
			var dynamoDbConfig = new AmazonDynamoDBConfig
			{
				RegionEndpoint = RegionEndpoint.GetBySystemName(appConfig.AwsRegion)
			};
			var awsCredentials = new AwsCredentials(appConfig);
			return new AmazonDynamoDBClient(awsCredentials, dynamoDbConfig);
		}
	}
}
