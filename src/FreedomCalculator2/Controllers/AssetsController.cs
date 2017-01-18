using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FreedomCalculator2.Controllers
{
    [Route("api/[controller]")]
    public class AssetsController : Controller
    {
		UserManager<ApplicationUser> _userManager;
		IFreedomCalculatorRepository _repository;

        public AssetsController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
			_userManager = userManager;
			_repository = repository;
        }

        // GET: api/assets
        [HttpGet]
        public async Task<IEnumerable<Asset>> Get()
        {
			ApplicationUser user = await _userManager.GetUserAsync(User);
			return _repository.GetUserAssets(Guid.Parse(user.Id), AssetType.Any);
        }

        // GET api/assets/5
        [HttpGet("{id}")]
        public Asset Get(int id)
        {
            return new Asset();
        }

        // POST api/assets
        [HttpPost]
        public void Post([FromBody]Asset value)
        {
        }

        // PUT api/assets/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Asset value)
        {
        }

        // DELETE api/asssets/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
