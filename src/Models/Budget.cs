using System;
// using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("Budget")]
    public class Budget
    {
        public int BudgetId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public DateTime Date { get; set; }

        // [Display(Name="Earned Income")]
        // [DataType(DataType.Currency)]
        // public decimal EarnedIncome { get; set; }

        // [NotMapped]
        // [Range(0, (double)decimal.MaxValue, ErrorMessage = "Value must be positve")]
        // [DataType(DataType.Currency)]
        // [Display(Name="Add")]
        // public decimal AddEarnedIncomeAmount { get; set; }

        // [Display(Name = "Passive Income")]
        // [DataType(DataType.Currency)]
        // public decimal PassiveIncome { get; set; }

        // [NotMapped]
        // [Range(0, (double)decimal.MaxValue, ErrorMessage = "Value must be positve")]
        // [DataType(DataType.Currency)]
        // [Display(Name = "Add")]
        // public decimal AddPassiveIncomeAmount { get; set; }

        // [Display(Name = "Mandatory Expenses")]
        // [DataType(DataType.Currency)]
        // public decimal MandatoryExpenses { get; set; }

        // [Display(Name = "Discretionary Expenses")]
        // [DataType(DataType.Currency)]
        // public decimal DiscretionaryExpenses { get; set; }

        // [NotMapped]
        // [Display(Name = "Total Expenses")]
        // [DataType(DataType.Currency)]
        // public decimal TotalExpenses
        // {
        //     get
        //     {
        //         return MandatoryExpenses + DiscretionaryExpenses;
        //     }
        // }

        // [NotMapped]
        // [Display(Name = "Total Income")]
        // [DataType(DataType.Currency)]
        // public decimal TotalIncome
        // {
        //     get
        //     {
        //         return EarnedIncome + PassiveIncome;
        //     }
        // }

        // [DataType(DataType.Currency)]
        // public decimal Investments { get; set; }

        // [NotMapped]
        // [Range(0, (double)decimal.MaxValue, ErrorMessage = "Value must be positve")]
        // [DataType(DataType.Currency)]
        // [Display(Name = "Add")]
        // public decimal AddInvenstmentAmount { get; set; }

        // public virtual List<BudgetExpense> Expenses { get; set; }
    }
}