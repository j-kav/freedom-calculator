using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace FreedomCalculator2.Models
{
    public class FreedomCalculatorRepository : IFreedomCalculatorRepository
    {
        ApplicationDbContext db;
        ZillowClient _zillowClient;
        YahooFinanceClient _yahooFinanceClient;

        public FreedomCalculatorRepository(ApplicationDbContext dbContext, ZillowClient zillowClient, YahooFinanceClient yahooFinanceClient)
        {
            db = dbContext;
            _zillowClient = zillowClient;
            _yahooFinanceClient = yahooFinanceClient;
        }
        async Task SaveChanges()
        {
            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                // TODO handle errors...these are swallowed so when it happens on production there is no indication
                Debug.WriteLine(e.ToString());
            }
        }

        public async Task<List<Asset>> GetAssets(Guid userId)
        {
            AssetQuoter quoter = new AssetQuoter(_zillowClient, _yahooFinanceClient);

            List<Asset> retVal = db.Assets.Where((asset) => asset.User.Id == userId.ToString()).ToList<Asset>();
            List<string> symbols = new List<string>(retVal.Count);

            foreach (Asset asset in retVal)
            {
                if (asset.AssetType == AssetType.RealEstate)
                {
                    AssetQuoter.PropertyValue property = await quoter.GetPropertyValue(asset.Symbol);
                    asset.Value = decimal.Parse(property.amount);
                }
                else if (asset.AssetType == AssetType.DomesticBond || asset.AssetType == AssetType.InternationalBond ||
                        asset.AssetType == AssetType.DomesticStock || asset.AssetType == AssetType.InternationalStock)
                {
                    symbols.Add(asset.Symbol);
                }
            }

            if (symbols.Count > 0)
            {
                // populate the prices and values for the assets
                List<AssetQuote> quotes = await quoter.GetQuotes(symbols);

                foreach (AssetQuote quote in quotes)
                {
                    IEnumerable<Asset> assets = retVal.Where(a => string.Equals(a.Symbol.Trim(), quote.Symbol.Trim(), StringComparison.OrdinalIgnoreCase));
                    foreach (Asset asset in assets)
                    {
                        asset.SharePrice = quote.SharePrice;
                        asset.Value = quote.SharePrice * (decimal)asset.NumShares;
                    }
                }
            }

            return retVal;
        }

        public async Task<int> AddAsset(Asset asset)
        {
            await db.Assets.AddAsync(asset);
            await SaveChanges();
            return asset.AssetId;
        }

        public async Task RemoveAsset(int id)
        {
            Asset assetToRemove = db.Assets.Where(asset => asset.AssetId == id).FirstOrDefault();
            db.Assets.Remove(assetToRemove);
            await SaveChanges();
        }

        public async Task UpdateAsset(int id, Asset updatedAsset)
        {
            Asset assetToUpdate = db.Assets.Where(asset => asset.AssetId == id).FirstOrDefault();
            assetToUpdate.Name = updatedAsset.Name;
            assetToUpdate.NumShares = updatedAsset.NumShares;
            assetToUpdate.Symbol = updatedAsset.Symbol;
            if (assetToUpdate.AssetType == AssetType.Cash)
            {
                assetToUpdate.Value = updatedAsset.Value;
            }
            await SaveChanges();
        }

        public List<Liability> GetLiabilities(Guid userId)
        {
            List<Liability> retVal = db.Liabilities.Where((liability) => liability.User.Id == userId.ToString()).ToList<Liability>();
            return retVal;
        }
    }
}
