using FreedomCalculator2.Models;
using FreedomCalculator2.Migrations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AspNet.Security.OpenIdConnect.Primitives;

namespace FreedomCalculator2
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            // add the config file which stores the connection string
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json").AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // add MVC for web api
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            // add options to be injected (settings from app.settings file)
            services.AddOptions();
            services.Configure<FreedomCalculatorConfig>((options) => Configuration.GetSection("FreedomCalculatorConfig").Bind(options));

            // add entity framework using the config connection string
            services.AddEntityFrameworkSqlServer()
                .AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));

            // add identity
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configure Identity to use the same JWT claims as OpenIddict instead
            // of the legacy WS-Federation claims it uses by default (ClaimTypes),
            // which saves you from doing the mapping in your authorization controller.
            services.Configure<IdentityOptions>(options =>
            {
                options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
            });

            services.AddOpenIddict(options =>
            {
                // Register the Entity Framework stores.
                options.AddEntityFrameworkCoreStores<ApplicationDbContext>();

                // Register the ASP.NET Core MVC binder used by OpenIddict.
                // Note: if you don't call this method, you won't be able to
                // bind OpenIdConnectRequest or OpenIdConnectResponse parameters.
                options.AddMvcBinders();

                // Enable the token endpoint.
                options.EnableTokenEndpoint("/connect/token");

                // Enable the password flow.
                options.AllowPasswordFlow();

                // During development, you can disable the HTTPS requirement.
                options.DisableHttpsRequirement();

                // Note: to use JWT access tokens instead of the default
                // encrypted format, the following lines are required:
                //
                // options.UseJsonWebTokens();
                // options.AddEphemeralSigningKey();

                // On production, using a X.509 certificate stored in the machine store is recommended.
                // You can generate a self-signed certificate using Pluralsight's self-cert utility:
                // https://s3.amazonaws.com/pluralsight-free/keith-brown/samples/SelfCert.zip
                // 
                // services.AddOpenIddict<ApplicationDbContext>()
                //     .AddSigningCertificate("7D2A741FE34CC2C7369237A5F2078988E17A6A75");
                // 
                // Alternatively, you can also store the certificate as an embedded .pfx resource
                // directly in this assembly or in a file published alongside this project:
                // 
                // services.AddOpenIddict<ApplicationDbContext>()
                //     .AddSigningCertificate(
                //          assembly: typeof(Startup).GetTypeInfo().Assembly,
                //          resource: "AuthorizationServer.Certificate.pfx",
                //          password: "OpenIddict");
            });

            // for creating and seeding the database if necessary
            services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
            services.AddScoped<IFreedomCalculatorRepository, FreedomCalculatorRepository>();
            services.AddScoped<IZillowClient, ZillowClient>();
            services.AddScoped<IYahooFinanceClient, YahooFinanceClient>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IDatabaseInitializer databaseInitializer)
        {
            app.UseDeveloperExceptionPage();

            // Add a middleware used to validate access
            // tokens and protect the API endpoints.
            app.UseOAuthValidation();

            // If you prefer using JWT, don't forget to disable the automatic
            // JWT -> WS-Federation claims mapping used by the JWT middleware:
            //
            // JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            // JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
            //
            // app.UseJwtBearerAuthentication(new JwtBearerOptions
            // {
            //     Authority = "http://localhost:58795/",
            //     Audience = "resource_server",
            //     RequireHttpsMetadata = false,
            //     TokenValidationParameters = new TokenValidationParameters
            //     {
            //         NameClaimType = OpenIdConnectConstants.Claims.Subject,
            //         RoleClaimType = OpenIdConnectConstants.Claims.Role
            //     }
            // });
            app.UseOpenIddict();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // setup API
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            // seed the database
            databaseInitializer.Seed();
        }
    }
}
