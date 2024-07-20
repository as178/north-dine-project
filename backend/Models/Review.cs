using System.ComponentModel.DataAnnotations;

namespace NorthDineRestaurant.Models
{
    public class Review
    {
        public int Id { get; set; }

        [Required]
        public required string Title { get; set; } // Required

        [Required]
        public required string Body { get; set; } // Required

        [Required]
        public required string UserName { get; set; } // Required

        // Computed property
        public required string UserInitial { get; set; }
    }
}
