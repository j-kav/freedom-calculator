using System.Threading.Tasks;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FreedomCalculator2.Controllers
{
	[Authorize(Roles = "testrole")]
	public class UserController : Controller
	{
		private ApplicationDbContext _context;
		private UserManager<ApplicationUser> _userManager;

		public UserController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
		{
			_context = context;
			_userManager = userManager;
		}

		[Route("api/user"), HttpGet]
		public async Task<IActionResult> Get()
		{
			var user = await _userManager.GetUserAsync(User);
			if (user == null) return Ok("No user / not logged in");// if Authorize is not applied
			return Ok(user);
		}
	}
}
