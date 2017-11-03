using FreedomCalculator2.Exceptions;
using Microsoft.EntityFrameworkCore;
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
        IZillowClient _zillowClient;
        IFinanceClient _financeClient;

        public FreedomCalculatorRepository(ApplicationDbContext dbContext, IZillowClient zillowClient, IFinanceClient financeClient)
        {
            db = dbContext;
            _zillowClient = zillowClient;
            _financeClient = financeClient;
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
            AssetQuoter quoter = new AssetQuoter(_zillowClient, _financeClient);

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
            assetToUpdate.LiabilityId = updatedAsset.LiabilityId;
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

        public async Task<int> AddLiability(Liability liability)
        {
            await db.Liabilities.AddAsync(liability);
            await SaveChanges();
            return liability.LiabilityId;
        }

        public async Task RemoveLiability(int id)
        {
            Liability liabilityToRemove = db.Liabilities.Where(liability => liability.LiabilityId == id).FirstOrDefault();
            db.Liabilities.Remove(liabilityToRemove);
            await SaveChanges();
        }

        public async Task UpdateLiability(int id, Liability updatedLiability)
        {
            Liability liabilityToUpdate = db.Liabilities.Where(liability => liability.LiabilityId == id).FirstOrDefault();
            liabilityToUpdate.Name = updatedLiability.Name;
            liabilityToUpdate.Principal = updatedLiability.Principal;
            await SaveChanges();
        }

        public List<Expense> GetExpenses(Guid userId)
        {
            List<Expense> retVal = db.Expenses.Where((expense) => expense.User.Id == userId.ToString()).ToList<Expense>();
            return retVal;
        }

        public async Task<int> AddExpense(Expense expense)
        {
            await db.Expenses.AddAsync(expense);
            await SaveChanges();
            return expense.ExpenseId;
        }

        public async Task RemoveExpense(int id)
        {
            Expense expenseToRemove = db.Expenses.Where(expense => expense.ExpenseId == id).FirstOrDefault();
            db.Expenses.Remove(expenseToRemove);
            await SaveChanges();
        }

        public async Task UpdateExpense(int id, Expense updatedExpense)
        {
            Expense expenseToUpdate = db.Expenses.Where(expense => expense.ExpenseId == id).FirstOrDefault();
            expenseToUpdate.Name = updatedExpense.Name;
            expenseToUpdate.IsMandatory = updatedExpense.IsMandatory;
            await SaveChanges();
        }

        public List<Budget> GetBudgets(Guid userId)
        {
            List<Budget> retVal = db.Budgets.Include(budget => budget.EarnedIncome)
                                            .Include(budget => budget.PassiveIncome)
                                            .Include(budget => budget.Investments)
                                            .Include(budget => budget.Expenses)
                                                .ThenInclude(expense => expense.BudgetExpenseItems)
                                            .Include(budget => budget.Expenses)
                                                .ThenInclude(exp => exp.Expense)
                                            .Where((budget) => budget.User.Id == userId.ToString())
                                            .OrderByDescending(budget => budget.Year)
                                            .ThenByDescending(budget => budget.Month)
                                            .ToList<Budget>();
            return retVal;
        }

        public async Task<int> AddBudget(Budget budget)
        {
            List<Budget> budgetsWithSameDate = db.Budgets.Where((b) => b.User.Id == budget.User.Id.ToString() && b.Month == budget.Month && b.Year == budget.Year).ToList<Budget>();

            if (budgetsWithSameDate.Any())
            {
                throw new BudgetAlreadyExistsException();
            }

            await db.Budgets.AddAsync(budget);
            await SaveChanges();
            return budget.BudgetId;
        }

        public async Task UpdateBudget(int id, Budget updatedBudget)
        {
            Budget budgetToUpdate = db.Budgets.Where(budget => budget.BudgetId == id).FirstOrDefault();
            budgetToUpdate.ProjectedEarnedIncome = updatedBudget.ProjectedEarnedIncome;
            budgetToUpdate.NetWorth = updatedBudget.NetWorth;
            await SaveChanges();
        }

        public async Task RemoveBudget(int id)
        {
            Budget budgetToRemove = db.Budgets.Where(budget => budget.BudgetId == id).FirstOrDefault();
            db.Budgets.Remove(budgetToRemove);
            await SaveChanges();
        }

        public async Task<int> AddBudgetEarnedIncomeItem(BudgetEarnedIncomeItem budgetEarnedIncomeItem)
        {
            await db.BudgetEarnedIncomeItems.AddAsync(budgetEarnedIncomeItem);
            await SaveChanges();
            return budgetEarnedIncomeItem.BudgetEarnedIncomeItemId;
        }

        public async Task UpdateBudgetEarnedIncomeItem(int id, BudgetEarnedIncomeItem updatedBudgetEarnedIncomeItem)
        {
            BudgetEarnedIncomeItem budgetEarnedIncomeItemToUpdate = db.BudgetEarnedIncomeItems.Where(budgetEarnedIncomeItem => budgetEarnedIncomeItem.BudgetEarnedIncomeItemId == id).FirstOrDefault();
            budgetEarnedIncomeItemToUpdate.Amount = updatedBudgetEarnedIncomeItem.Amount;
            await SaveChanges();
        }

        public async Task RemoveBudgetEarnedIncomeItem(int id)
        {
            BudgetEarnedIncomeItem budgetEarnedIncomeItemToRemove = db.BudgetEarnedIncomeItems.Where(budgetEarnedIncomeItem => budgetEarnedIncomeItem.BudgetEarnedIncomeItemId == id).FirstOrDefault();
            db.BudgetEarnedIncomeItems.Remove(budgetEarnedIncomeItemToRemove);
            await SaveChanges();
        }

        public async Task<int> AddBudgetPassiveIncomeItem(BudgetPassiveIncomeItem budgetPassiveIncomeItem)
        {
            await db.BudgetPassiveIncomeItems.AddAsync(budgetPassiveIncomeItem);
            await SaveChanges();
            return budgetPassiveIncomeItem.BudgetPassiveIncomeItemId;
        }

        public async Task UpdateBudgetPassiveIncomeItem(int id, BudgetPassiveIncomeItem updatedBudgetPassiveIncomeItem)
        {
            BudgetPassiveIncomeItem budgetPassiveIncomeItemToUpdate = db.BudgetPassiveIncomeItems.Where(budgetPassiveIncomeItem => budgetPassiveIncomeItem.BudgetPassiveIncomeItemId == id).FirstOrDefault();
            budgetPassiveIncomeItemToUpdate.Amount = updatedBudgetPassiveIncomeItem.Amount;
            await SaveChanges();
        }

        public async Task RemoveBudgetPassiveIncomeItem(int id)
        {
            BudgetPassiveIncomeItem budgetPassiveIncomeItemToRemove = db.BudgetPassiveIncomeItems.Where(budgetPassiveIncomeItem => budgetPassiveIncomeItem.BudgetPassiveIncomeItemId == id).FirstOrDefault();
            db.BudgetPassiveIncomeItems.Remove(budgetPassiveIncomeItemToRemove);
            await SaveChanges();
        }

        public async Task<int> AddBudgetInvestmentItem(BudgetInvestmentItem budgetInvestmentItem)
        {
            await db.BudgetInvestmentItems.AddAsync(budgetInvestmentItem);
            await SaveChanges();
            return budgetInvestmentItem.BudgetInvestmentItemId;
        }

        public async Task UpdateBudgetInvestmentItem(int id, BudgetInvestmentItem updatedBudgetInvestmentItem)
        {
            BudgetInvestmentItem budgetInvestmentItemToUpdate = db.BudgetInvestmentItems.Where(budgetInvestmentItem => budgetInvestmentItem.BudgetInvestmentItemId == id).FirstOrDefault();
            budgetInvestmentItemToUpdate.Amount = updatedBudgetInvestmentItem.Amount;
            await SaveChanges();
        }

        public async Task RemoveBudgetInvestmentItem(int id)
        {
            BudgetInvestmentItem budgetInvestmentItemToRemove = db.BudgetInvestmentItems.Where(budgetInvestmentItem => budgetInvestmentItem.BudgetInvestmentItemId == id).FirstOrDefault();
            db.BudgetInvestmentItems.Remove(budgetInvestmentItemToRemove);
            await SaveChanges();
        }

        public async Task<int> AddBudgetExpense(BudgetExpense budgetExpense)
        {
            await db.BudgetExpenses.AddAsync(budgetExpense);
            await SaveChanges();
            return budgetExpense.BudgetExpenseId;
        }

        public async Task UpdateBudgetExpense(int id, BudgetExpense updatedBudgetExpense)
        {
            BudgetExpense budgetExpenseToUpdate = db.BudgetExpenses.Where(budgetExpense => budgetExpense.BudgetExpenseId == id).FirstOrDefault();
            budgetExpenseToUpdate.Projected = updatedBudgetExpense.Projected;
            await SaveChanges();
        }

        public async Task RemoveBudgetExpense(int id)
        {
            BudgetExpense budgetExpenseToRemove = db.BudgetExpenses.Where(budgetExpense => budgetExpense.BudgetExpenseId == id).FirstOrDefault();
            db.BudgetExpenses.Remove(budgetExpenseToRemove);
            await SaveChanges();
        }

        public async Task<int> AddBudgetExpenseItem(BudgetExpenseItem budgetExpenseItem)
        {
            await db.BudgetExpenseItems.AddAsync(budgetExpenseItem);
            await SaveChanges();
            return budgetExpenseItem.BudgetExpenseItemId;
        }

        public async Task UpdateBudgetExpenseItem(int id, BudgetExpenseItem updatedBudgetExpenseItem)
        {
            BudgetExpenseItem budgetExpenseItemToUpdate = db.BudgetExpenseItems.Where(budgetExpenseItem => budgetExpenseItem.BudgetExpenseItemId == id).FirstOrDefault();
            budgetExpenseItemToUpdate.Amount = updatedBudgetExpenseItem.Amount;
            await SaveChanges();
        }

        public async Task RemoveBudgetExpenseItem(int id)
        {
            BudgetExpenseItem budgetExpenseItemToRemove = db.BudgetExpenseItems.Where(budgetExpenseItem => budgetExpenseItem.BudgetExpenseItemId == id).FirstOrDefault();
            db.BudgetExpenseItems.Remove(budgetExpenseItemToRemove);
            await SaveChanges();
        }

        public List<ExpenseAverage> GetExpenseAverages(Guid userId)
        {
            // Going for this kind of query:
            //
            //      SELECT Name, SUM(Amount) / (SELECT COUNT(*) FROM Budget WHERE UserId=XXXX) AS Amount
            //      FROM Expense JOIN BudgetExpense on BudgetExpense.ExpenseId = Expense.ExpenseId
            //      JOIN Budget ON Budget.BudgetId = BudgetExpense.BudgetId
            //      JOIN BudgetExpenseItem on BudgetExpenseItem.BudgetExpenseId = BudgetExpense.BudgetExpenseId
            //      WHERE Budget.UserId=XXXX
            //      GROUP BY Name
            //
            // in order to get averages for items that may not necessarily be in all budgets 
            // (a $10 expense on only  1 of 2 budgets should average $5)
            // could not figure out how to do this with 1 linq query
            // TODO optimize this

            // get the number of budgets for the user
            var numUserBudgetsQuery = from budget in db.Budgets
                                      where budget.User.Id == userId.ToString()
                                      select budget;

            int numUserBudgets = numUserBudgetsQuery.Count();

            // get all the expenses for the user's budgets and total them up in a group
            var query = from expense in db.Expenses
                        join budgetExpense in db.BudgetExpenses on expense.ExpenseId equals budgetExpense.ExpenseId
                        join budgetExpenseItem in db.BudgetExpenseItems on budgetExpense.BudgetExpenseId equals budgetExpenseItem.BudgetExpenseId
                        join budget in db.Budgets on budgetExpense.BudgetId equals budget.BudgetId
                        where budget.User.Id == userId.ToString()
                        group new { expense, budgetExpenseItem } by new { expense.Name, expense.IsMandatory } into g
                        select new
                        {
                            g.Key.Name,
                            Total = (Decimal?)g.Sum(p => p.budgetExpenseItem.Amount),
                            IsMandatory = g.Key.IsMandatory
                        };


            List<ExpenseAverage> retVal = new List<ExpenseAverage>();

            // now divide the totals by the number of budgets to get the averages
            foreach (var item in query.OrderByDescending(i => i.Total))
            {
                retVal.Add(new ExpenseAverage
                {
                    Name = item.Name,
                    Average = item.Total.GetValueOrDefault() / numUserBudgets,
                    IsMandatory = item.IsMandatory
                });
            }

            return retVal;
        }
    }
}
