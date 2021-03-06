﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreedomCalculator2.Models
{
    [Table("Asset")]
    public class Asset
    {
        public int AssetId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public AssetType AssetType { get; set; }

        [NotMapped]
        public string AssetTypeString { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [Required, StringLength(50)]
        public string Symbol { get; set; }

        [Required, StringLength(50)]
        public string Address { get; set; }

        [Required, StringLength(50)]
        public string City { get; set; }

        [Required, StringLength(2)]
        public string State { get; set; }

        [Required, StringLength(10)]
        public string Zip { get; set; }

        [Required(ErrorMessage = "Number of shares is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Value must be positve")]
        public double NumShares { get; set; }

        [NotMapped]
        public decimal SharePrice { get; set; }

        [Range(0, (double)decimal.MaxValue, ErrorMessage = "Value must be positve")]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Value { get; set; }

        // optional link to liability (such as a mortgage for real estate)
        public Liability Liability { get; set; }
        [ForeignKey("Liability")]
        public int? LiabilityId { get; set; }
    }
}