using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("BudgetInvestmentItem")]
    public class BudgetInvestmentItem
    {
        public int BudgetInvestmentItemId { get; set; }
        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateTime TimeStamp { get; set;}
    }
}