using System;
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
        List<Budget> GetBudgets(Guid userId);
        Task<int> AddBudget(Budget budget);
        Task UpdateBudget(int id, Budget budget);
        Task RemoveBudget(int id);
        Task<int> AddBudgetEarnedIncomeItem(BudgetEarnedIncomeItem budgetEarnedIncomeItem);
        Task UpdateBudgetEarnedIncomeItem(int id, BudgetEarnedIncomeItem updatedBudgetEarnedIncomeItem);
        Task RemoveBudgetEarnedIncomeItem(int id);
        Task<int> AddBudgetPassiveIncomeItem(BudgetPassiveIncomeItem budgetPassiveIncomeItem);
        Task UpdateBudgetPassiveIncomeItem(int id, BudgetPassiveIncomeItem updatedBudgetPassiveIncomeItem);
        Task RemoveBudgetPassiveIncomeItem(int id);
        Task<int> AddBudgetInvestmentItem(BudgetInvestmentItem budgetInvestmentItem);
        Task UpdateBudgetInvestmentItem(int id, BudgetInvestmentItem updatedBudgetInvestmentItem);
        Task RemoveBudgetInvestmentItem(int id);
        Task<int> AddBudgetExpense(BudgetExpense budgetExpense);
        Task UpdateBudgetExpense(int id, BudgetExpense updatedBudgetExpense);
        Task RemoveBudgetExpense(int id);
        Task<int> AddBudgetExpenseItem(BudgetExpenseItem budgetExpenseItem);
        Task UpdateBudgetExpenseItem(int id, BudgetExpenseItem updatedBudgetExpenseItem);
        Task RemoveBudgetExpenseItem(int id);
    }
}
