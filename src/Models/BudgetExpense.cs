using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("BudgetExpense")]
    public class BudgetExpense
    {
        public int BudgetExpenseId { get; set; }
        public virtual Expense Expense { get; set; }
        public decimal Projected { get; set; }
        public List<BudgetExpenseItem> BudgetExpenseItems { get; set; }
    }
}