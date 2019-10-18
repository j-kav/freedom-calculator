using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("BudgetExpenseItem")]
    public class BudgetExpenseItem
    {
        public int BudgetExpenseItemId { get; set; }
        public int BudgetExpenseId { get; set; }
        public virtual BudgetExpense BudgetExpense { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}