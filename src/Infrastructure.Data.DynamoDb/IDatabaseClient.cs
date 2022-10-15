using Amazon.DynamoDBv2.Model;
using System.Threading.Tasks;

namespace Infrastructure.Data.DynamoDb
{
    public interface IDatabaseClient
    {
        Task<ScanResponse> ScanAsync(ScanRequest request);

        Task CreateTableAsync(CreateTableRequest createTableRequest);

        Task PutItemAsync(PutItemRequest putItemRequest);

        Task<QueryResponse> GetItemsAsync(QueryRequest request);

        Task<string> GetTableStatusAsync(string tableName);
    }
}
