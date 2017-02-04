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

		public FreedomCalculatorRepository(ApplicationDbContext dbContext, ZillowClient zillowClient)
		{
			db = dbContext;
			_zillowClient = zillowClient;
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

		public List<Asset> GetAssets(Guid userId)
		{
			return db.Assets.Where((asset) => asset.User.Id == userId.ToString()).ToList<Asset>();
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
			assetToUpdate.Value = updatedAsset.Value;
			await SaveChanges();
		}
	}
}
