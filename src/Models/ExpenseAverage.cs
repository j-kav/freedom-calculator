using System.ComponentModel.DataAnnotations;

namespace FreedomCalculator2.Models
{
    public class ExpenseAverage
    {
        public string Name { get; set; }
        public decimal Average { get; set; }
        public bool IsMandatory { get; set; }
    }
}