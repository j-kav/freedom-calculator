using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AspNet.Security.OAuth.Validation;
using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FreedomCalculator2.Controllers
{
    [Route("api/assets")]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class AssetsController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;
        IZillowClient _zillowClient;
        IFinanceClient _financeClient;
        ILogger _logger;

        public AssetsController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository, IZillowClient zillowClient, IFinanceClient financeClient, ILogger<AssetsController> logger)
        {
            _userManager = userManager;
            _repository = repository;
            _zillowClient = zillowClient;
            _financeClient = financeClient;
            _logger = logger;
        }

        // GET: api/assets
        [HttpGet]
        public async Task<IEnumerable<Asset>> Get()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            List<Asset> assets = new List<Asset>();
            try
            {
                assets = await _repository.GetAssets(Guid.Parse(user.Id));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception getting assets");
            }
            return assets;
        }

        // POST api/assets
        [HttpPost]
        public async Task<Asset> Post([FromBody]Asset asset)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            asset.User = user;
            AssetQuoter assetQuoter = new AssetQuoter(_zillowClient, _financeClient);
            if (asset.AssetType == AssetType.RealEstate)
            {
                // get the zillow id and set the symbol
                string zpid = await assetQuoter.GetPropertyId(asset.Address, asset.City, asset.State, asset.Zip);
                asset.Symbol = zpid;
            }
            asset.AssetId = await _repository.AddAsset(asset);
            if (asset.AssetType == AssetType.RealEstate)
            {
                // set the current value
                AssetQuoter.PropertyValue propValue = await assetQuoter.GetPropertyValue(asset.Symbol);
                decimal decimalValue;
                if (decimal.TryParse(propValue.amount, out decimalValue))
                {
                    asset.Value = decimalValue;
                }
            }
            else if (asset.AssetType == AssetType.DomesticBond || asset.AssetType == AssetType.DomesticStock ||
                asset.AssetType == AssetType.InternationalBond || asset.AssetType == AssetType.InternationalStock)
            {
                // set the current value
                AssetQuote quote = await assetQuoter.GetQuote(asset.Symbol);
                asset.SharePrice = quote.SharePrice;
                asset.Value = quote.SharePrice * (decimal)asset.NumShares;
            }
            return asset;
        }

        // PUT api/assets/5
        [HttpPut("{id}")]
        public async Task<Asset> Put(int id, [FromBody]Asset asset)
        {
            await _repository.UpdateAsset(id, asset);
            asset.AssetId = id;
            AssetQuoter assetQuoter = new AssetQuoter(_zillowClient, _financeClient);
            if (asset.AssetType == AssetType.DomesticBond || asset.AssetType == AssetType.DomesticStock ||
                asset.AssetType == AssetType.InternationalBond || asset.AssetType == AssetType.InternationalStock)
            {
                // set the current value
                AssetQuote quote = await assetQuoter.GetQuote(asset.Symbol);
                asset.SharePrice = quote.SharePrice;
                asset.Value = quote.SharePrice * (decimal)asset.NumShares;
            }
            return asset;
        }

        // DELETE api/asssets/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveAsset(id);
        }
    }
}
