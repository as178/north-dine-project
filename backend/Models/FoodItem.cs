using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace NorthDineRestaurant.Models
{
    public class FoodItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Title { get; set; }

        [Required]
        [StringLength(500)]
        public required string ShortDescription { get; set; }

        [Required]
        public List<string> Ingredients { get; set; } = new List<string>();

        [Required]
        [Column(TypeName = "decimal(4,2)")]
        public decimal Price { get; set; }

        [Required]
        public required string ImageUrl { get; set; }

        [Required]
        [StringLength(50)]
        public required string Category { get; set; }
    }
}
