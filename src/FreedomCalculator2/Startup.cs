using System.IO;
using FreedomCalculator2.Infrastructure;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenIddict;
using OpenIddict.Models;

namespace FreedomCalculator2
{
	public class Startup
	{
		public IConfigurationRoot Configuration { get; set; }

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			// add the config file which stores the connection string
			ConfigurationBuilder builder = new ConfigurationBuilder();
			builder.SetBasePath(Directory.GetCurrentDirectory());
			builder.AddJsonFile("appsettings.json");
			Configuration = builder.Build();

			// add entity framework using the config connection string
			services.AddEntityFrameworkSqlServer()
				.AddDbContext<ApplicationDbContext>(options =>
					options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));

			// add identity with openiddict
			services.AddIdentity<ApplicationUser, ApplicationRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders()
				.AddOpenIddictCore<Application>(config => config.UseEntityFramework());

			// add MVC for web api
			services.AddMvc();

			// for seeding the database with the demo user details
			// TODO determine if this stuff is needed after POC is done
			services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
			services.AddScoped<OpenIddictManager<ApplicationUser, Application>, CustomOpenIddictManager>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IDatabaseInitializer databaseInitializer)
		{
			app.UseDeveloperExceptionPage();

			app.UseDefaultFiles();
			app.UseStaticFiles();

			app.UseOpenIddictCore(builder =>
			{
				// tell openiddict you're wanting to use jwt tokens
				builder.Options.UseJwtTokens();
				// NOTE: for dev consumption only! for live, this is not encouraged!
				builder.Options.AllowInsecureHttp = true;
				builder.Options.ApplicationCanDisplayErrors = true;
			});

			// use jwt bearer authentication
			app.UseJwtBearerAuthentication(new JwtBearerOptions
			{
				AutomaticAuthenticate = true,
				AutomaticChallenge = true,
				RequireHttpsMetadata = false,
				Audience = "http://localhost:50212/",
				Authority = "http://localhost:50212/"
			});

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
