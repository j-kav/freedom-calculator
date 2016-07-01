﻿using OpenIddict;

namespace FreedomCalculator2.Models
{
	// Add profile data for application users by adding properties to the ApplicationUser class
	public class ApplicationUser : OpenIddictUser
	{
		public string GivenName { get; set; }
	}
}
