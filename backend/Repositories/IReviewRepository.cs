using System.Collections.Generic;
using System.Threading.Tasks;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Repositories
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetReviewsAsync();
        Task<Review?> GetReviewByIdAsync(int id);
        Task AddReviewAsync(Review review);
        Task UpdateReviewAsync(Review review);
        Task DeleteReviewAsync(int id);
    }
}
