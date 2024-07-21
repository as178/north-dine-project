using System.Collections.Generic;
using System.Threading.Tasks;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Repositories
{
    public interface IFoodItemRepository
    {
        Task<IEnumerable<FoodItem>> GetFoodItemsAsync();
        Task<FoodItem?> GetFoodItemByIdAsync(int id);
        Task AddFoodItemAsync(FoodItem foodItem);
        Task UpdateFoodItemAsync(FoodItem foodItem);
        Task DeleteFoodItemAsync(int id);
    }
}
