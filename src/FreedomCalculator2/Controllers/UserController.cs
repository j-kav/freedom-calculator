using System.Threading.Tasks;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AspNet.Security.OAuth.Validation;

namespace FreedomCalculator2.Controllers
{
    [Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class UserController : Controller
	{
		UserManager<ApplicationUser> _userManager;

		public UserController(UserManager<ApplicationUser> userManager)
		{
			_userManager = userManager;
		}

		[Route("api/user"), HttpGet]
		public async Task<IActionResult> Get()
		{
			ApplicationUser user = await _userManager.GetUserAsync(User);
			if (user == null) return Ok("No user / not logged in");// if Authorize is not applied
			return Ok(user);
		}
	}
}
