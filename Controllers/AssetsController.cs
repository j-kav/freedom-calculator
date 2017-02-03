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
        ZillowClient _zillowClient;

        public AssetsController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository, ZillowClient zillowClient)
        {
			_userManager = userManager;
			_repository = repository;
            _zillowClient = zillowClient;
        }

        // GET: api/assets
        [HttpGet]
        public async Task<IEnumerable<Asset>> Get()
        {
			ApplicationUser user = await _userManager.GetUserAsync(User);
			List<Asset> assets = _repository.GetAssets(Guid.Parse(user.Id));
            return assets;
        }

        // POST api/assets
        [HttpPost]
        public async Task<int> Post([FromBody]Asset asset)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            asset.User = user;
            if (asset.AssetType == AssetType.RealEstate)
            {
                // get the zillow id and set the symbol
                AssetQuoter assetQuoter = new AssetQuoter(_zillowClient);
                //assetQuoter.GetPropertyId("", "", "", "");
            }
            return await _repository.AddAsset(asset);
        }

        // PUT api/assets/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]Asset asset)
        {
            await _repository.UpdateAsset(id, asset);
        }

        // DELETE api/asssets/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveAsset(id);
        }
    }
}
