using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FreedomCalculator2.Models
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
		public ApplicationDbContext(DbContextOptions options) : base(options)
		{ }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
		}

		public DbSet<Asset> Assets { get; set; }
		public DbSet<Liability> Liabilities { get; set; }
		public DbSet<Expense> Expenses { get; set; }
		public DbSet<Budget> Budgets { get; set; }
		public DbSet<BudgetEarnedIncomeItem> BudgetEarnedIncomeItems { get; set; }
		public DbSet<BudgetPassiveIncomeItem> BudgetPassiveIncomeItems { get; set; }
		public DbSet<BudgetInvestmentItem> BudgetInvestmentItems { get; set; }
		public DbSet<BudgetExpense> BudgetExpenses { get; set; }
		public DbSet<BudgetExpenseItem> BudgetExpenseItems { get; set; }
	}
}
