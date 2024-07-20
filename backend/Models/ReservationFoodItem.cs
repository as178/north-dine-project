using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NorthDineRestaurant.Models
{
    public class ReservationFoodItem
    {
        [Required]
        public int ReservationId { get; set; }
        public required Reservation Reservation { get; set; }

        [Required]
        public int FoodItemId { get; set; }
        public required FoodItem FoodItem { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(4,2)")]  // Precision of 4 total digits, with 2 decimal places
        public decimal TotalPrice { get; set; }
    }
}
