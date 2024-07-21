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
    public class ReviewController : ControllerBase
    {
        private readonly ReviewContext _context;

        public ReviewController(ReviewContext context)
        {
            _context = context;
        }

        // GET: api/Review
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _context.Reviews.ToListAsync();
        }

        // GET: api/Review/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        // POST: api/Review
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview([FromBody] ReviewCreateDto dto)
        {
            var review = new Review
            {
                Title = dto.Title,
                Body = dto.Body,
                UserName = dto.UserName
                // UserInitial is computed by the database
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
        }

        // PUT: api/Review/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, [FromBody] ReviewUpdateDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            review.Title = dto.Title;
            review.Body = dto.Body;
            review.UserName = dto.UserName;

            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Review/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class ReviewCreateDto
    {
        public required string Title { get; set; }
        public required string Body { get; set; }
        public required string UserName { get; set; }
    }

    public class ReviewUpdateDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Body { get; set; }
        public required string UserName { get; set; }
    }
}
