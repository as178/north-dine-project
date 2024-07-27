using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Data
{
    public class ReservationContext : DbContext
    {
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationFoodItem> ReservationFoodItems { get; set; }

        public ReservationContext(DbContextOptions<ReservationContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure ReservationFoodItem composite key
            modelBuilder.Entity<ReservationFoodItem>()
                .HasKey(rf => new { rf.ReservationId, rf.FoodItemId });

            // Configure relationships
            modelBuilder.Entity<Reservation>()
                .HasMany(r => r.ReservationFoodItems)
                .WithOne(rf => rf.Reservation)
                .HasForeignKey(rf => rf.ReservationId)
                .OnDelete(DeleteBehavior.Cascade); // Or set to NoAction if no delete behavior is desired

            modelBuilder.Entity<ReservationFoodItem>()
                .HasOne(rf => rf.FoodItem)
                .WithMany() // No navigation property on FoodItem
                .HasForeignKey(rf => rf.FoodItemId)
                .OnDelete(DeleteBehavior.Restrict); // Adjust based on desired behavior

            // Configure property types
            modelBuilder.Entity<ReservationFoodItem>()
                .Property(rf => rf.TotalPrice)
                .HasColumnType("decimal(4,2)");
        }
    }
}
