using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;

namespace FreedomCalculator2.Controllers
{
    [Route("api/assets")]
    [Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
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
			List<Asset> assets = _repository.GetAssets(Guid.Parse(user.Id));
            return assets;
        }

        // GET api/assets/5
        [HttpGet("{id}")]
        public Asset Get(int id)
        {
            return new Asset();
        }

        // POST api/assets
        [HttpPost]
        public async Task<int> Post([FromBody]Asset asset)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            asset.User = user;
            return await _repository.AddAsset(asset);
        }

        // PUT api/assets/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Asset value)
        {
        }

        // DELETE api/asssets/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveAsset(id);
        }
    }
}
