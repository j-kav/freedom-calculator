using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Extensions;
using FreedomCalculator2.Models;
using OpenIddict;
using OpenIddict.Models;

namespace FreedomCalculator2.Infrastructure
{
	public class CustomOpenIddictManager : OpenIddict.OpenIddictManager<ApplicationUser, Application>
	{
		public CustomOpenIddictManager(OpenIddictServices<ApplicationUser, Application> services)
			: base(services)
		{
		}

		public override async Task<ClaimsIdentity> CreateIdentityAsync(ApplicationUser user, IEnumerable<string> scopes)
		{
			var claimsIdentity = await base.CreateIdentityAsync(user, scopes);

			claimsIdentity.AddClaim("given_name", user.GivenName,
				OpenIdConnectConstants.Destinations.AccessToken, 
				OpenIdConnectConstants.Destinations.IdentityToken);

			return claimsIdentity;
		}
	}
}