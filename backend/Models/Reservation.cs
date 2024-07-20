using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NorthDineRestaurant.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        [Required]
        public required string FirstName { get; set; } // Required

        [Required]
        public required string LastName { get; set; } // Required

        [Required]
        public required string Email { get; set; } // Required

        [Required]
        public required string PhoneNumber { get; set; } // Required

        [Required]
        public int NumberOfPeople { get; set; } // Required

        [Required]
        public DateTime ReservationDate { get; set; } // Required

        [Required]
        public TimeSpan ReservationTime { get; set; } // Required

        [Required]
        public List<ReservationFoodItem> ReservationFoodItems { get; set; } = new List<ReservationFoodItem>(); // Required List

        public bool? RomanticSetup { get; set; } // Optional
        public bool? Birthday { get; set; } // Optional
        public bool? Anniversary { get; set; } // Optional
        public bool? Engagement { get; set; } // Optional
        public bool? WheelchairAccess { get; set; } // Optional
        public bool? AllergyAccommodations { get; set; } // Optional
        public string? SpecialNotes { get; set; } // Optional
    }
}
