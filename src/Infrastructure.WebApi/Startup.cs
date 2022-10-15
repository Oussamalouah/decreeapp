namespace Decree.Stationery.Ecommerce.Infrastructure.WebApi
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using AutoMapper;
    using Decree.Stationery.Ecommerce.Core.Application.Services;
    using Decree.Stationery.Ecommerce.Core.Domain.Services;
    //    using Decree.Stationery.Ecommerce.Infrastructure.Data.MongoDb;
    using Decree.Stationery.Ecommerce.Infrastructure.Server;
    using Decree.Stationery.Ecommerce.Infrastructure.WebApi.Authorization.Requirements;
    using Decree.Stationery.Ecommerce.Infrastructure.WebApi.Exceptions;
    using FluentValidation.AspNetCore;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using Swashbuckle.AspNetCore.Swagger;
    using App.Metrics.Extensions;
    using Microsoft.Extensions.Hosting;
    using Microsoft.OpenApi.Models;
    using Decree.Stationery.Ecommerce.Infrastructure.Ecommerce.Shopify;
    using Decree.Stationery.Ecommerce.Infrastructure.FileStorage.Aws.S3;
    using Decree.Stationery.Ecommerce.Infrastructure.File.Conversion;
    using Decree.Stationery.Ecommerce.Infrastructure.Data.DynamoDb;
    using Decree.Stationery.Ecommerce.Infrastructure.Notification.ConstantContact;

    public class Startup
    {
        private readonly ILogger<DecreeExceptionFilter> _logger;
        public Startup(IConfiguration configuration, IWebHostEnvironment enviroment, ILogger<DecreeExceptionFilter> logger)
        {
            Configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _env = enviroment ?? throw new ArgumentNullException(nameof(enviroment));
        }

        public IConfiguration Configuration { get; }
        private readonly IWebHostEnvironment _env;

        // This method gets called by the runtime. Use this met     hod to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                  .AddMetrics(
                      Configuration.GetSection("AppMetrics"),
                      options => options.GlobalTags.Add("app", "Reference Architecture - Decree Stationery API Service"))
                .AddJsonSerialization()
                .AddHealthChecks()
                .AddMetricsMiddleware(Configuration.GetSection("AspNetMetrics"));

            services.AddControllers();

            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MessageMappingProfile>();
                cfg.AddProfile<DynamoMappingProfile>();
                cfg.ValidateInlineMaps = false;
            }, AppDomain.CurrentDomain.GetAssemblies());

            services .AddMvc(opt =>
                {
                    opt.Filters.Add<DecreeExceptionFilter>();
                    opt.EnableEndpointRouting = false;
                    //config.AddMetricsResourceFilter();  //TODO - Metrics problem - Investigate
                 })
                 .AddNewtonsoftJson(opts =>
                 {
                    opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                 })
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            string domain = $"https://{Configuration["Auth0:Domain"]}/";

            services.AddCors();

            services.AddAuthorization(options => {
                options.AddPolicy("https://decree.dev/stationary/pingsecure",
                    policy => policy.Requirements.Add(new HasScopeRequirement("https://decree.dev/stationary/pingsecure", domain)));
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Decree Stationery API",
                    Version = "v1",
                    Description = "Decree Stationery API",
                    TermsOfService = new Uri("https://decree-co.myshopify.com"),
                    Contact = new OpenApiContact { Name = "Walter Pinson", Email = "", Url = new Uri("https://github.com/walterpinson") },
                });
            });

            // Add Application services.
            var auth0Audience = Environment.GetEnvironmentVariable("Auth0__Audience");
            var auth0Domain = Environment.GetEnvironmentVariable("Auth0__Domain");
            var awsBucket = Environment.GetEnvironmentVariable("AWSS3_Bucket");
            var awsRegion = Environment.GetEnvironmentVariable("AWSS3_Region");
            var awsBaseUrl = Environment.GetEnvironmentVariable("AWSS3_BaseUrl");
            var awsAccessKey = Environment.GetEnvironmentVariable("AWSS3_AccessKey");
            var awsSecretKey = Environment.GetEnvironmentVariable("AWSS3_SecretKey");
            var shopifyUrl = Environment.GetEnvironmentVariable("Shopify_BaseUrl");
            var shopAccessToken = Environment.GetEnvironmentVariable("Shopify_AccessToken");
            var shopApiKey = Environment.GetEnvironmentVariable("Shopify_ApiKey");
            var shopSecretKey = Environment.GetEnvironmentVariable("Shopify_SecretKey");
            var mongoDBConnection = Environment.GetEnvironmentVariable("DecreeConnectionString");

            var dynamoDbRegion = Environment.GetEnvironmentVariable("DynamoDBRegion");
            var dynamoDbAccessKey = Environment.GetEnvironmentVariable("DynamoDBAccessKey");
            var dynamoDbSecreyKey = Environment.GetEnvironmentVariable("DynamoDBSecretKey");

            var emailApiKey = Environment.GetEnvironmentVariable("Decree_EmailApiKey");
            var emailSecretkey = Environment.GetEnvironmentVariable("Decree_EmailSecretKey");
            var emailBaseUrl = Environment.GetEnvironmentVariable("Decree_EmailBaseUrl");
            var emailFromEmail = Environment.GetEnvironmentVariable("Decree_FromEmail");
            var emailFromName = Environment.GetEnvironmentVariable("Decree_FromName");
            var emailReplyToEmail = Environment.GetEnvironmentVariable("Decree_ReplyToEmail");
            var emailSmtpServer = Environment.GetEnvironmentVariable("Decree_SmtpServer");
            var emailSmptPortNo = Environment.GetEnvironmentVariable("Decree_SmptPortNo");
            var emailSmtpUsername = Environment.GetEnvironmentVariable("Decree_SmtpUsername");
            var emailSmtpPassword = Environment.GetEnvironmentVariable("Decree_SmtpPassword");
            var emailContactUsEmail = Environment.GetEnvironmentVariable("Decree_ContactUsEmail");
            var emailRedirectUri = Environment.GetEnvironmentVariable("Decree_RedirectUri");

            if (_env.IsDevelopment())
            {
                auth0Audience = Configuration["Auth0:Audience"];
                auth0Domain = Configuration["Auth0:Domain"];
                awsBucket = Configuration["S3:Bucket"];
                awsRegion = Configuration["S3:Region"];
                awsBaseUrl = Configuration["S3:BaseUrl"];
                awsAccessKey = Configuration["S3:AccessKey"];
                awsSecretKey = Configuration["S3:SecretKey"];
                shopifyUrl = Configuration["Shopify:BaseUrl"];
                shopAccessToken = Configuration["Shopify:AccessToken"];
                shopApiKey = Configuration["Shopify:ApiKey"];
                shopSecretKey = Configuration["Shopify:SecretKey"];
                mongoDBConnection = Configuration.GetConnectionString("DecreeService");
                dynamoDbRegion = Configuration["DynamoDb:Region"];
                dynamoDbAccessKey = Configuration["DynamoDb:AccessKey"];
                dynamoDbSecreyKey = Configuration["DynamoDb:SecretKey"];
                emailApiKey = Configuration["EmailConfig:ApiKey"];
                emailSecretkey = Configuration["EmailConfig:SecretKey"];
                emailBaseUrl = Configuration["EmailConfig:BaseUrl"];
                emailFromEmail = Configuration["EmailConfig:FromEmail"];
                emailFromName = Configuration["EmailConfig:FromName"];
                emailReplyToEmail = Configuration["EmailConfig:ReplyToEmail"];

                emailSmtpServer = Configuration["EmailConfig:SmtpServer"];
                emailSmptPortNo = Configuration["EmailConfig:SmptPortNo"];
                emailSmtpUsername = Configuration["EmailConfig:SmtpUsername"];
                emailSmtpPassword = Configuration["EmailConfig:SmtpPassword"];
                emailContactUsEmail = Configuration["EmailConfig:ContactUsEmail"];
                emailRedirectUri = Configuration["EmailConfig:RedirectUri"];
            }

            services.AddAuthentication(options =>
            {

                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>  
            {
                options.Authority = $"https://{auth0Domain}/";
                options.Audience = auth0Audience;
                options.RequireHttpsMetadata = false;
            });

            var contentRoot = _env.ContentRootPath; ;
            services.AddTransient<IOrderTakerService, OrderTakerService>();
            services.AddTransient<IFileService, FileService>();
            services.AddTransient<IShopifyOrderService>(sp =>
                new ShopifyOrderService(shopifyUrl, shopAccessToken, shopApiKey, shopSecretKey));
            services.AddTransient<IAwsStorageService>(sp =>
                new AwsStorageService( awsBucket, awsRegion, awsBaseUrl, awsAccessKey, awsSecretKey, contentRoot));
            services.AddTransient<ICustomerRepository>(sp =>
                new CustomerRepository("", dynamoDbRegion, dynamoDbAccessKey, dynamoDbSecreyKey, sp.GetRequiredService<IMapper>()));
            services.AddTransient<ICustomerAddressRepository>(sp =>
                 new CustomerAddressRepository("", dynamoDbRegion, dynamoDbAccessKey, dynamoDbSecreyKey, sp.GetRequiredService<IMapper>()));
            services.AddTransient<IConvertSVGToSTL>(sp =>
               new ConvertSVGToSTL());
            services.AddTransient<INotificationService>(sp =>
              new NotificationService(emailBaseUrl, emailApiKey, emailSecretkey, emailFromName, emailFromEmail, emailReplyToEmail, emailSmtpServer, emailSmptPortNo, emailSmtpUsername, emailSmtpPassword, emailRedirectUri));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Decree Stationery API V1");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

           
            app.UseCors(x => x
              .AllowAnyMethod()
              .AllowAnyHeader()
              .SetIsOriginAllowed(origin => true) // allow any origin
              .AllowCredentials()); // allow credentials

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
