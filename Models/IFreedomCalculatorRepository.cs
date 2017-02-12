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
		Task<int> AddLiability(Liability liability);
		Task RemoveLiability(int id);
		Task UpdateLiability(int id, Liability updatedLiability);
		List<Expense> GetExpenses(Guid userId);
		Task<int> AddExpense(Expense expense);
		Task RemoveExpense(int id);
		Task UpdateExpense(int id, Expense updatedExpense);
	}
}
