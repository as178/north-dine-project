using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Data;
using NorthDineRestaurant.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NorthDineRestaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemController : ControllerBase
    {
        private readonly FoodItemContext _context;
        private readonly string _imageFolderPath;

        public FoodItemController(FoodItemContext context, IWebHostEnvironment env)
        {
            _context = context;
            _imageFolderPath = Path.Combine(env.WebRootPath, "images");

            // Ensure the image folder exists
            if (!Directory.Exists(_imageFolderPath))
            {
                Directory.CreateDirectory(_imageFolderPath);
            }
        }

        // GET: api/FoodItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodItem>>> GetFoodItems()
        {
            return await _context.FoodItems.ToListAsync();
        }

        // GET: api/FoodItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodItem>> GetFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);

            if (foodItem == null)
            {
                return NotFound();
            }

            return foodItem;
        }

        // POST: api/FoodItem
        [HttpPost]
        public async Task<ActionResult<FoodItem>> PostFoodItem([FromForm] FoodItemCreateDto dto, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return BadRequest("Image file is required.");
            }

            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
            var filePath = Path.Combine(_imageFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            var imageUrl = $"/images/{fileName}";

            var foodItem = new FoodItem
            {
                Title = dto.Title,
                ShortDescription = dto.ShortDescription,
                Ingredients = dto.Ingredients.Split(',').Select(i => i.Trim()).ToList(), // Convert to List<string>
                Price = dto.Price,
                ImageUrl = imageUrl,
                Category = dto.Category
            };

            _context.FoodItems.Add(foodItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFoodItem), new { id = foodItem.Id }, foodItem);
        }

        // PUT: api/FoodItem/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodItem(int id, [FromForm] FoodItemUpdateDto dto, IFormFile? imageFile)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            var foodItem = await _context.FoodItems.FindAsync(id);
            if (foodItem == null)
            {
                return NotFound();
            }

            if (imageFile != null)
            {
                // Delete the old image file if it exists
                if (!string.IsNullOrEmpty(foodItem.ImageUrl))
                {
                    var oldImagePath = Path.Combine(_imageFolderPath, Path.GetFileName(foodItem.ImageUrl));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                // Upload the new image
                var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
                var filePath = Path.Combine(_imageFolderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                foodItem.ImageUrl = $"/images/{fileName}";
            }

            foodItem.Title = dto.Title;
            foodItem.ShortDescription = dto.ShortDescription;
            foodItem.Ingredients = dto.Ingredients.Split(',').Select(i => i.Trim()).ToList(); // Convert to List<string>
            foodItem.Price = dto.Price;
            foodItem.Category = dto.Category;

            _context.Entry(foodItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/FoodItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);
            if (foodItem == null)
            {
                return NotFound();
            }

            // Delete the image file if it exists
            if (!string.IsNullOrEmpty(foodItem.ImageUrl))
            {
                var imagePath = Path.Combine(_imageFolderPath, Path.GetFileName(foodItem.ImageUrl));
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            _context.FoodItems.Remove(foodItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public class FoodItemCreateDto
        {
            public required string Title { get; set; }
            public required string ShortDescription { get; set; }
            public required string Ingredients { get; set; }
            public decimal Price { get; set; }
            public required string Category { get; set; }
        }

        public class FoodItemUpdateDto
        {
            public int Id { get; set; }
            public required string Title { get; set; }
            public required string ShortDescription { get; set; }
            public required string Ingredients { get; set; }
            public decimal Price { get; set; }
            public required string Category { get; set; }
        }
    }
}
