using System.Linq;
using System.Threading.Tasks;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Identity;

namespace FreedomCalculator2
{
	public class DatabaseInitializer : IDatabaseInitializer
	{
		private readonly ApplicationDbContext _context;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly RoleManager<ApplicationRole> _roleManager;

		public DatabaseInitializer(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
		{
			_userManager = userManager;
			_context = context;
			_roleManager = roleManager;
		}

		public async Task Seed()
		{
			_context.Database.EnsureCreated();

			if (_context.Users.Any())
			{
				foreach (var u in _context.Users)
					_context.Remove(u);
				_context.SaveChanges();
			}

			// TODO remove
			var email = "andersco@gmail.com";
			ApplicationUser user;
			if (await _userManager.FindByEmailAsync(email) == null)
			{
				// use the create rather than addorupdate so can set password
				user = new ApplicationUser
				{
					UserName = email,
					Email = email,
					EmailConfirmed = true,
					GivenName = "Scott"
				};
				IdentityResult userResult = await _userManager.CreateAsync(user, "Freedom-2k16");
			}
		}
	}

	public interface IDatabaseInitializer
	{
		Task Seed();
	}
}
