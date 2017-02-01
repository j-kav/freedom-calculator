using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreedomCalculator2.Models
{
	public class FreedomCalculatorRepository : IFreedomCalculatorRepository
	{
		ApplicationDbContext db;

		public FreedomCalculatorRepository(ApplicationDbContext dbContext)
		{
			db = dbContext;
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
	}
}
