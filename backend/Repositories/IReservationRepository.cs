using System.Collections.Generic;
using System.Threading.Tasks;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Repositories
{
    public interface IReservationRepository
    {
        Task<IEnumerable<Reservation>> GetReservationsAsync();
        Task<Reservation?> GetReservationByIdAsync(int id);
        Task AddReservationAsync(Reservation reservation);
        Task UpdateReservationAsync(Reservation reservation);
        Task DeleteReservationAsync(int id);
    }
}
