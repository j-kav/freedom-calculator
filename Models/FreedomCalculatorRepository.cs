using System;
using System.Collections.Generic;
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

		public List<Asset> GetAssets(Guid userId)
		{
			return db.Assets.Where((asset) => asset.User.Id == userId.ToString()).ToList<Asset>();
		}

		public async Task<int> AddAsset(Asset asset)
		{
			await db.Assets.AddAsync(asset);
			await db.SaveChangesAsync();
			return asset.AssetId;
		}

		public async Task RemoveAsset(int id)
		{
			Asset assetToRemove = db.Assets.Where(asset => asset.AssetId == id).FirstOrDefault();
			db.Assets.Remove(assetToRemove);
			await db.SaveChangesAsync();
		}

		public async Task UpdateAsset(int id, Asset updatedAsset)
		{
			Asset assetToUpdate = db.Assets.Where(asset => asset.AssetId == id).FirstOrDefault();
			assetToUpdate.Name = updatedAsset.Name;
			assetToUpdate.NumShares = updatedAsset.NumShares;
			assetToUpdate.Symbol = updatedAsset.Symbol;
			assetToUpdate.Value = updatedAsset.Value;
			await db.SaveChangesAsync();
		}
	}
}
