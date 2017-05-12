using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("Expense")]
    public class Expense
    {
        public int ExpenseId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public bool IsMandatory { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }
    }
}