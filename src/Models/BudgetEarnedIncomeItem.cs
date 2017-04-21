using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("BudgetEarnedIncomeItem")]
    public class BudgetEarnedIncomeItem
    {
        public int BudgetEarnedIncomeId { get; set; }

        public decimal Amount { get; set; }

        public int BudgetId { get; set; }

        public virtual Budget Budget { get; set; }
    }
}