using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Data
{
    public class ReservationContext : DbContext
    {
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationFoodItem> ReservationFoodItems { get; set; }
        public DbSet<FoodItem> FoodItem { get; set; }  // Table name is FoodItem

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
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ReservationFoodItem>()
                .HasOne(rf => rf.FoodItem)
                .WithMany()
                .HasForeignKey(rf => rf.FoodItemId)
                .OnDelete(DeleteBehavior.Restrict);

            // Ensure FoodItem entity is mapped to FoodItem table
            modelBuilder.Entity<FoodItem>()
                .ToTable("FoodItem");
        }
    }
}
