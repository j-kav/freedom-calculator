using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("Liability")]
    public class Liability
    {
        public int LiabilityId { get; set; }

        public virtual ApplicationUser User { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [Range(0, (double)decimal.MaxValue, ErrorMessage = "Value must be positve")]
        [DataType(DataType.Currency)]
        public decimal Principal { get; set; }
    }
}