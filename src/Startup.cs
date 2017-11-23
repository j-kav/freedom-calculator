using AspNet.Security.OpenIdConnect.Primitives;
using FreedomCalculator2.Models;
using FreedomCalculator2.Migrations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace FreedomCalculator2
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }
        public IHostingEnvironment HostingEnvironment { get; set; }

        public Startup(IHostingEnvironment env)
        {
            // add the config file which stores the connection string
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json").AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            HostingEnvironment = env;
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
                {
                    options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
                    options.UseOpenIddict();
                });
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

                // Register the ASP.NET Core MVC binder used by OpenIddict in order to
                // bind OpenIdConnectRequest and OpenIdConnectResponse parameters.
                options.AddMvcBinders();

                // Enable the token endpoint.
                options.EnableTokenEndpoint("/connect/token");

                // Enable the password and the refresh token flows.
                options.AllowPasswordFlow()
                       .AllowRefreshTokenFlow();

                // Override the default token timeout to 20 min
                options.SetAccessTokenLifetime(new TimeSpan(0, 20, 0));

                // Disable the HTTPS requirement for dev env.
                if (HostingEnvironment.IsDevelopment())
                {
                    options.DisableHttpsRequirement();
                }
            });

            services.AddAuthentication().AddOAuthValidation();

            // for creating and seeding the database if necessary
            services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
            services.AddScoped<IFreedomCalculatorRepository, FreedomCalculatorRepository>();
            services.AddScoped<IZillowClient, ZillowClient>();
            services.AddScoped<IFinanceClient, FinanceClient>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvcWithDefaultRoute(); // setup API
        }
    }
}
