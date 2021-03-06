using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("Budget")]
    public class Budget
    {
        public int BudgetId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ProjectedEarnedIncome { get; set; }
        public List<BudgetEarnedIncomeItem> EarnedIncome { get; set; }
        public List<BudgetPassiveIncomeItem> PassiveIncome { get; set; }
        public List<BudgetInvestmentItem> Investments { get; set; }
        public List<BudgetExpense> Expenses { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NetWorth { get; set; }
    }
}