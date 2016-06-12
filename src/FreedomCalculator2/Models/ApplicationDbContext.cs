﻿using Microsoft.EntityFrameworkCore;
using OpenIddict;
using OpenIddict.Models;

namespace FreedomCalculator2.Models
{
	public class ApplicationDbContext : OpenIddictContext<ApplicationUser, Application, ApplicationRole, string>
	{
		public ApplicationDbContext(DbContextOptions options) : base(options)
		{ }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
		}
	}
}
