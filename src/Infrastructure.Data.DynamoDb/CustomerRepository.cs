namespace Decree.Stationery.Ecommerce.Infrastructure.Data.DynamoDb
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using AutoMapper;
    using MongoDB.Driver;
    using MongoRepository.NetCore;
    using Decree.Stationery.Ecommerce.Core.Domain.Services;
    using Decree.Stationery.Ecommerce.Core.Domain.Models;
    using System.Threading.Tasks;
    using Amazon.DynamoDBv2;
    using Amazon.DynamoDBv2.Model;
    using Decree.Stationery.Ecommerce.Infrastructure.Data.DynamoDb.Models;
    using Amazon;
    using Amazon.Runtime;
    using global::Infrastructure.Data.DynamoDb;
    using Core.Application.Messages;
    using Amazon.DynamoDBv2.DataModel;
    using global::Infrastructure.Data.DynamoDb.Extensions;

    public class CustomerRepository : ICustomerRepository
    {
        private readonly IMapper _mapper;
        private readonly string _awsRegion;
        private readonly string _awsAccessKey;
        private readonly string _awsSecretKey;
        private readonly string TableName = "Customer";
        private readonly IDatabaseClient _client;
        private readonly IDynamoDBContext _context;
        private readonly DynamoDBOperationConfig _operationConfig;

        public CustomerRepository(MongoUrl mongoUrl, IMapper mapper) => _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        public CustomerRepository(string connectionString, string awsRegion, string awsAccessKey, string awsSecretKey, IMapper mapper)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _awsRegion = awsRegion;
            _awsAccessKey = awsAccessKey;
            _awsSecretKey = awsSecretKey;

            var awsDynamoDb = DynamoDbClientFactory.CreateClient(new AppConfig()
            {
                AwsAccessKey = _awsAccessKey,
                AwsRegion = _awsRegion,
                AwsSecretKey = _awsSecretKey

            });

            _operationConfig = new DynamoDBOperationConfig
            {
                OverrideTableName = TableName
            };

            _client = new DatabaseClient(awsDynamoDb);
            _context = new DynamoDBContext(awsDynamoDb);

            CreateTableAsync().Wait();
        }

        public async Task CreateTableAsync()
        {
            var status = await _client.GetTableStatusAsync(TableName);
            if (status != "ACTIVE")
            {
                var request = new CreateTableRequest
                {
                    BillingMode = BillingMode.PAY_PER_REQUEST,
                    TableName = TableName,
                    KeySchema = new List<KeySchemaElement>
                    {
                         new KeySchemaElement
                        {
                            AttributeName = "Id",
                            KeyType = "HASH"
                        }
                    },
                    AttributeDefinitions = new List<AttributeDefinition>
                    {
                        new AttributeDefinition
                        {
                            AttributeName = "Id",
                            AttributeType = "S"
                        },
                        new AttributeDefinition
                        {
                            AttributeName = "CustomerId",
                            AttributeType = "S"
                        }
                    },
                    GlobalSecondaryIndexes = new List<GlobalSecondaryIndex>
                {
                   new GlobalSecondaryIndex()
                   {
                       IndexName = "nextRunIndex",
                       KeySchema = new List<KeySchemaElement>()
                       {
                            new KeySchemaElement(){ AttributeName = "CustomerId", KeyType = "HASH" }
                       },
                       Projection = new Projection
                       {
                           ProjectionType = "ALL"
                       }
                   }
                }};

                await _client.CreateTableAsync(request);
            }
        }

        public async Task<ICustomer> AddAsync(ICustomer customer)
        {
            var mapDynamoData = _mapper.Map<DynamoCustomer>(customer);
            mapDynamoData.Id = Guid.NewGuid().ToString();
            mapDynamoData.DateCreated = DateTime.UtcNow;
            await _context.SaveAsync(mapDynamoData, _operationConfig);
            return customer;
        }

        public async Task<ICustomer> Get(Guid id)
        {
            var existingData = await _context.LoadAsync<DynamoCustomer>(id.ToString());
            return existingData;
        }

        public async Task<IList<ICustomer>> GetAll()
        {
            var response = await _client.ScanAsync(new ScanRequest
            {
                TableName = TableName
            });
            var results = response.Items.ToCustomers();
            return _mapper.Map<IList<ICustomer>>(results);
        }

        public async Task<IList<ICustomer>> GetAllByCustomerId(string customerId)
        {
            var values = new Dictionary<string, AttributeValue>();
            values.Add(":customer_id", new AttributeValue { S = customerId });

            var response = await _client.GetItemsAsync(new QueryRequest
            {
                TableName = TableName,
                IndexName = "nextRunIndex",
                KeyConditionExpression = "CustomerId = :customer_id",
                ExpressionAttributeValues = values
            });

            var results = response.Items.ToCustomers();

            return _mapper.Map<IList<ICustomer>>(results);
        }

        public Task<ICustomer> GetByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<ICustomer> Save(ICustomer customer)
        {
            var mapDynamoData = _mapper.Map<DynamoCustomer>(customer);
            await _context.SaveAsync<DynamoCustomer>(mapDynamoData, _operationConfig);
            return customer;
        }

        public async Task Delete(Guid id)
        {
            await _context.DeleteAsync<DynamoCustomer>(id.ToString(), _operationConfig);
        }

        public async Task<ICustomer> GetByCustomerId(string customerId)
        {
            var customers = await GetAllByCustomerId(customerId);
            return customers.FirstOrDefault();
        }
    }
}