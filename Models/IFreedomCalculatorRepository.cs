using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreedomCalculator2.Models
{
	public interface IFreedomCalculatorRepository
	{
		List<Asset> GetUserAssets(Guid userId);

		Task<int> AddUserAsset(Asset asset);
	}
}
