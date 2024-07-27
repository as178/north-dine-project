using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NorthDineRestaurant.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; } = null!;

        [Required]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = null!;

        [Required]
        public int NumberOfPeople { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ReservationDate { get; set; }

        [Required]
        [DataType(DataType.Time)]
        [DisplayFormat(DataFormatString = "{0:hh\\:mm tt}", ApplyFormatInEditMode = true)]
        public TimeSpan ReservationTime { get; set; }

        [Required]
        public List<ReservationFoodItem> ReservationFoodItems { get; set; } = new List<ReservationFoodItem>();

        public bool RomanticSetup { get; set; } = false;
        public bool Birthday { get; set; } = false;
        public bool Anniversary { get; set; } = false;
        public bool Engagement { get; set; } = false;
        public bool WheelchairAccess { get; set; } = false;
        public bool AllergyAccommodations { get; set; } = false;
        public string? SpecialNotes { get; set; }
    }
}
