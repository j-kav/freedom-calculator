using System;
using System.Collections.Generic;

namespace FreedomCalculator2.Models
{
	public interface IFreedomCalculatorRepository
	{
		List<Asset> GetUserAssets(Guid userId, AssetType type);
	}
}
