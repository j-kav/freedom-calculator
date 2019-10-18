using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("BudgetExpense")]
    public class BudgetExpense
    {
        public int BudgetExpenseId { get; set; }
        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }
        public int ExpenseId { get; set; }
        public virtual Expense Expense { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Projected { get; set; }
        public List<BudgetExpenseItem> BudgetExpenseItems { get; set; }
    }
}