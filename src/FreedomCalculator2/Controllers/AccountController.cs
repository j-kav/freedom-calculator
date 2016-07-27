using System.Threading.Tasks;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FreedomCalculator2.Controllers
{
	[Route("api/account")]
	public class AccountController : Controller
	{
		private readonly UserManager<ApplicationUser> _userManager;

		public AccountController(UserManager<ApplicationUser> userManager)
		{
			_userManager = userManager;
		}

		// POST api/account
		[HttpPost]
		public async Task Post([FromBody]RegistrationModel user)
		{
			if (ModelState.IsValid)
			{
				if (await _userManager.FindByEmailAsync(user.Email) == null)
				{
					ApplicationUser newUser = new ApplicationUser
					{
						UserName = user.Email,
						Email = user.Email,
						EmailConfirmed = true,
						GivenName = user.GivenName
					};
					IdentityResult userResult = await _userManager.CreateAsync(newUser, user.Password);
				}
			}
		}
	}
}
