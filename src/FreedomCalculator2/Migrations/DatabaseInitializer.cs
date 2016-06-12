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

			// Add Mvc.Client to the known applications.
			if (_context.Applications.Any())
			{
				foreach (var application in _context.Applications)
					_context.Remove(application);
				_context.SaveChanges();
			}

			if (_context.Users.Any())
			{
				foreach (var u in _context.Users)
					_context.Remove(u);
				_context.SaveChanges();
			}

			// TODO remove
			var email = "scott@test.com";
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
				await _userManager.CreateAsync(user, "P2ssw0rd!");
			}

			user = await _userManager.FindByEmailAsync(email);
			var roleName = "testrole";
			if (await _roleManager.FindByNameAsync(roleName) == null)
			{
				await _roleManager.CreateAsync(new ApplicationRole() { Name = roleName });
			}

			if (!await _userManager.IsInRoleAsync(user, roleName))
			{
				await _userManager.AddToRoleAsync(user, roleName);
			}
		}
	}

	public interface IDatabaseInitializer
	{
		Task Seed();
	}
}
