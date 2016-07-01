using System;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OpenIddict;

namespace FreedomCalculator2.Infrastructure
{
	public class CustomOpenIddictManager : OpenIddictTokenManager<OpenIddictToken>
	{
		public CustomOpenIddictManager(
			IServiceProvider services,
			IOpenIddictTokenStore<OpenIddictToken> store,
			UserManager<ApplicationUser> users,
			IOptions<IdentityOptions> options,
			ILogger<OpenIddictTokenManager<OpenIddictToken>> logger)
			: base(services, store, options, logger)
		{
		}
	}
}