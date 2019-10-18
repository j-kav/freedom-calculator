using FreedomCalculator2.Migrations;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FreedomCalculator2
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }
        public IWebHostEnvironment HostingEnvironment { get; set; }

        public Startup(IWebHostEnvironment env)
        {
            // add the config file which stores the connection string
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json").AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true).AddJsonFile("appsettings.user.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            HostingEnvironment = env;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            // add entity framework using the config connection string
            services.AddDbContext<ApplicationDbContext>(options =>
                {
                    options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
                });

            // add identity
            services.AddIdentity<ApplicationUser, IdentityRole>()
                    .AddEntityFrameworkStores<ApplicationDbContext>()
                    .AddDefaultTokenProviders();

            // add options to be injected (settings from app.settings file)
            services.AddOptions();
            IConfigurationSection freedomCalculatorConfigSection = Configuration.GetSection("FreedomCalculatorConfig");
            services.Configure<FreedomCalculatorConfig>((options) => freedomCalculatorConfigSection.Bind(options));

            // configure jwt authentication
            FreedomCalculatorConfig freedomCalculatorConfig = freedomCalculatorConfigSection.Get<FreedomCalculatorConfig>();
            byte[] key = Encoding.ASCII.GetBytes(freedomCalculatorConfig.JWTSecret);
            services.AddAuthentication(authOptions =>
            {
                authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(jwtOptions =>
            {
                jwtOptions.RequireHttpsMetadata = false;
                jwtOptions.SaveToken = true;
                jwtOptions.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // for creating and seeding the database if necessary
            // TODO review if these should be singleton/trasient/scoped
            services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
            services.AddScoped<IFreedomCalculatorRepository, FreedomCalculatorRepository>();
            services.AddScoped<IZillowClient, ZillowClient>();
            services.AddScoped<IFinanceClient, FinanceClient>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (!HostingEnvironment.IsDevelopment())
            {
                // force https on production
                var options = new RewriteOptions().AddRedirectToHttps();
                app.UseRewriter(options);
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // global cors policy
            // TODO review
            app.UseCors(corsPolicy => corsPolicy
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
