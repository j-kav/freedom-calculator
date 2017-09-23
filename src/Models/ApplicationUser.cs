using Microsoft.AspNetCore.Identity;

namespace FreedomCalculator2.Models
{
	// Add profile data for application users by adding properties to the ApplicationUser class
	public class ApplicationUser : IdentityUser
	{
		public string GivenName { get; set; }
	}
}
