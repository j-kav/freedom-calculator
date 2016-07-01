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

        //// GET: api/account
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/account/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/account
        [HttpPost]
        public async void Post(ApplicationUser user, string password)
        {
            if (await _userManager.FindByEmailAsync(user.Email) == null)
            {
                await _userManager.CreateAsync(user, password);
            }
        }

        //// PUT api/account/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/account/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
