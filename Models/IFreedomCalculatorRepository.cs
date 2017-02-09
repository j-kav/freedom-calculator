﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreedomCalculator2.Models
{
	public interface IFreedomCalculatorRepository
	{
		Task<List<Asset>> GetAssets(Guid userId);
		Task<int> AddAsset(Asset asset);
		Task RemoveAsset(int id);
		Task UpdateAsset(int id, Asset updatedAsset);
		List<Liability> GetLiabilities(Guid userId);
	}
}
