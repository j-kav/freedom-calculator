using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("BudgetExpenseItem")]
    public class BudgetExpenseItem
    {
        public int BudgetExpenseItemId { get; set; }
        public BudgetExpense BudgetExpense { get; set; }
        public decimal Amount { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}