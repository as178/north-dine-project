using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NorthDineRestaurant.Models
{
    public class FoodItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Title { get; set; } // Title in uppercase

        [Required]
        [StringLength(500)]
        public required string ShortDescription { get; set; }

        [Required]
        public required string Ingredients { get; set; }

        [Required]
        [Column(TypeName = "decimal(4,2)")] // Precision of 4 total digits, with 2 decimal places
        public decimal Price { get; set; }

        public string? ImageUrl { get; set; } // Optional: URL for the image
    }
}
