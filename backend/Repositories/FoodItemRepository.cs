using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Data;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Repositories
{
    public class FoodItemRepository : IFoodItemRepository
    {
        private readonly FoodItemContext _context;

        public FoodItemRepository(FoodItemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FoodItem>> GetFoodItemsAsync()
        {
            return await _context.FoodItems.ToListAsync();
        }

        public async Task<FoodItem?> GetFoodItemByIdAsync(int id)
        {
            return await _context.FoodItems.FindAsync(id);
        }

        public async Task AddFoodItemAsync(FoodItem foodItem)
        {
            _context.FoodItems.Add(foodItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateFoodItemAsync(FoodItem foodItem)
        {
            _context.Entry(foodItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFoodItemAsync(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);
            if (foodItem != null)
            {
                _context.FoodItems.Remove(foodItem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
