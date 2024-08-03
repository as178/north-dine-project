using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Data;
using NorthDineRestaurant.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthDineRestaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationContext _context;
        private readonly DbSet<FoodItem> _foodItemSet;

        public ReservationController(ReservationContext context)
        {
            _context = context;
            _foodItemSet = context.Set<FoodItem>();
        }

        // GET: api/Reservation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetReservations()
        {
            var reservations = await _context.Reservations
                .Include(r => r.ReservationFoodItems)
                .ThenInclude(rfi => rfi.FoodItem)
                .ToListAsync();

            return reservations.Select(r => ToDto(r)).ToList();
        }

        // GET: api/Reservation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationDto>> GetReservation(int id)
        {
            var reservation = await _context.Reservations
                .Include(r => r.ReservationFoodItems)
                .ThenInclude(rfi => rfi.FoodItem)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reservation == null)
            {
                return NotFound();
            }

            return ToDto(reservation);
        }

        // POST: api/Reservation
        [HttpPost]
        public async Task<ActionResult<ReservationDto>> PostReservation(ReservationDto reservationDto)
        {
            var reservation = ToEntity(reservationDto);

            // Fetch the food items and calculate TotalPrice
            var foodItemIds = reservation.ReservationFoodItems.Select(rfi => rfi.FoodItemId).Distinct().ToList();
            var foodItems = await _foodItemSet
                .Where(fi => foodItemIds.Contains(fi.Id))
                .ToListAsync();

            var foodItemLookup = foodItems.ToDictionary(fi => fi.Id);

            foreach (var rfi in reservation.ReservationFoodItems)
            {
                if (foodItemLookup.TryGetValue(rfi.FoodItemId, out var foodItem))
                {
                    rfi.TotalPrice = rfi.Quantity * foodItem.Price;
                }
            }

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReservation), new { id = reservation.Id }, ToDto(reservation));
        }

        // POST: api/Reservation/1/addFoodItem
        [HttpPost("{id}/addFoodItem")]
        public async Task<IActionResult> AddFoodItem(int id, [FromBody] ReservationFoodItemDto foodItemDto)
        {
            var reservation = await _context.Reservations
                .Include(r => r.ReservationFoodItems)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reservation == null)
            {
                return NotFound();
            }

            var foodItem = await _foodItemSet.FindAsync(foodItemDto.FoodItemId);
            if (foodItem == null)
            {
                return BadRequest("Food item not found.");
            }

            reservation.ReservationFoodItems.Add(new ReservationFoodItem
            {
                FoodItemId = foodItemDto.FoodItemId,
                Quantity = foodItemDto.Quantity,
                TotalPrice = foodItemDto.Quantity * foodItem.Price // Calculate total price
            });

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Reservation/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, ReservationDto reservationDto)
        {
            if (id != reservationDto.Id)
            {
                return BadRequest();
            }

            var reservation = await _context.Reservations
                .Include(r => r.ReservationFoodItems)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reservation == null)
            {
                return NotFound();
            }

            UpdateEntity(reservation, reservationDto);

            // Fetch the food items and calculate TotalPrice
            var foodItemIds = reservation.ReservationFoodItems.Select(rfi => rfi.FoodItemId).Distinct().ToList();
            var foodItems = await _foodItemSet
                .Where(fi => foodItemIds.Contains(fi.Id))
                .ToListAsync();

            var foodItemLookup = foodItems.ToDictionary(fi => fi.Id);

            foreach (var rfi in reservation.ReservationFoodItems)
            {
                if (foodItemLookup.TryGetValue(rfi.FoodItemId, out var foodItem))
                {
                    rfi.TotalPrice = rfi.Quantity * foodItem.Price;
                }
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Reservation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }

        private ReservationDto ToDto(Reservation reservation)
        {
            return new ReservationDto
            {
                Id = reservation.Id,
                FirstName = reservation.FirstName,
                LastName = reservation.LastName,
                Email = reservation.Email,
                PhoneNumber = reservation.PhoneNumber,
                NumberOfPeople = reservation.NumberOfPeople,
                ReservationDate = reservation.ReservationDate,
                ReservationTime = reservation.ReservationTime,
                RomanticSetup = reservation.RomanticSetup,
                Birthday = reservation.Birthday,
                Anniversary = reservation.Anniversary,
                Engagement = reservation.Engagement,
                WheelchairAccess = reservation.WheelchairAccess,
                AllergyAccommodations = reservation.AllergyAccommodations,
                SpecialNotes = reservation.SpecialNotes,
                ReservationFoodItems = reservation.ReservationFoodItems.Select(rfi => new ReservationFoodItemDto
                {
                    FoodItemId = rfi.FoodItemId,
                    Quantity = rfi.Quantity,
                    TotalPrice = rfi.TotalPrice  // Expose TotalPrice for read operations
                }).ToList()
            };
        }

        private Reservation ToEntity(ReservationDto reservationDto)
        {
            return new Reservation
            {
                Id = reservationDto.Id,
                FirstName = reservationDto.FirstName,
                LastName = reservationDto.LastName,
                Email = reservationDto.Email,
                PhoneNumber = reservationDto.PhoneNumber,
                NumberOfPeople = reservationDto.NumberOfPeople,
                ReservationDate = reservationDto.ReservationDate,
                ReservationTime = reservationDto.ReservationTime,
                RomanticSetup = reservationDto.RomanticSetup ?? false,
                Birthday = reservationDto.Birthday ?? false,
                Anniversary = reservationDto.Anniversary ?? false,
                Engagement = reservationDto.Engagement ?? false,
                WheelchairAccess = reservationDto.WheelchairAccess ?? false,
                AllergyAccommodations = reservationDto.AllergyAccommodations ?? false,
                SpecialNotes = reservationDto.SpecialNotes,
                ReservationFoodItems = reservationDto.ReservationFoodItems.Select(rfi => new ReservationFoodItem
                {
                    FoodItemId = rfi.FoodItemId,
                    Quantity = rfi.Quantity,
                    // TotalPrice will be calculated server-side
                }).ToList()
            };
        }

        private void UpdateEntity(Reservation reservation, ReservationDto reservationDto)
        {
            reservation.FirstName = reservationDto.FirstName;
            reservation.LastName = reservationDto.LastName;
            reservation.Email = reservationDto.Email;
            reservation.PhoneNumber = reservationDto.PhoneNumber;
            reservation.NumberOfPeople = reservationDto.NumberOfPeople;
            reservation.ReservationDate = reservationDto.ReservationDate;
            reservation.ReservationTime = reservationDto.ReservationTime;
            reservation.RomanticSetup = reservationDto.RomanticSetup ?? false;
            reservation.Birthday = reservationDto.Birthday ?? false;
            reservation.Anniversary = reservationDto.Anniversary ?? false;
            reservation.Engagement = reservationDto.Engagement ?? false;
            reservation.WheelchairAccess = reservationDto.WheelchairAccess ?? false;
            reservation.AllergyAccommodations = reservationDto.AllergyAccommodations ?? false;
            reservation.SpecialNotes = reservationDto.SpecialNotes;

            reservation.ReservationFoodItems.Clear();
            reservation.ReservationFoodItems = reservationDto.ReservationFoodItems.Select(rfi => new ReservationFoodItem
            {
                ReservationId = reservation.Id,
                FoodItemId = rfi.FoodItemId,
                Quantity = rfi.Quantity,
                // TotalPrice will be calculated server-side
            }).ToList();
        }
    }

    public class FoodItemDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string ImageUrl { get; set; }
        public decimal Price { get; set; }
    }

    public class ReservationFoodItemDto
    {
        public int FoodItemId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; } // Included for read operations
    }

    public class ReservationDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required int NumberOfPeople { get; set; }
        public required DateTime ReservationDate { get; set; }
        public required TimeSpan ReservationTime { get; set; }
        public bool? RomanticSetup { get; set; }
        public bool? Birthday { get; set; }
        public bool? Anniversary { get; set; }
        public bool? Engagement { get; set; }
        public bool? WheelchairAccess { get; set; }
        public bool? AllergyAccommodations { get; set; }
        public string? SpecialNotes { get; set; }
        public List<ReservationFoodItemDto> ReservationFoodItems { get; set; } = new List<ReservationFoodItemDto>();
    }
}
