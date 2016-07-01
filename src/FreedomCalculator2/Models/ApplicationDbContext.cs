using Microsoft.EntityFrameworkCore;
using OpenIddict;

namespace FreedomCalculator2.Models
{
	public class ApplicationDbContext : OpenIddictDbContext<ApplicationUser>
	{
		public ApplicationDbContext(DbContextOptions options) : base(options)
		{ }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
		}
	}
}
