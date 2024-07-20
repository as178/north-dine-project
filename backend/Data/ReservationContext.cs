using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Data
{
    public class ReservationContext : DbContext
    {
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<ReservationFoodItem> ReservationFoodItems { get; set; }

        public ReservationContext(DbContextOptions<ReservationContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Reservation>()
                .HasMany(r => r.ReservationFoodItems)
                .WithOne(rf => rf.Reservation)
                .HasForeignKey(rf => rf.ReservationId);

            modelBuilder.Entity<ReservationFoodItem>()
                .HasKey(rf => new { rf.ReservationId, rf.FoodItemId });

            modelBuilder.Entity<ReservationFoodItem>()
                .HasOne(rf => rf.FoodItem)
                .WithMany()
                .HasForeignKey(rf => rf.FoodItemId);

            modelBuilder.Entity<ReservationFoodItem>()
                .HasOne(rf => rf.Reservation)
                .WithMany(r => r.ReservationFoodItems)
                .HasForeignKey(rf => rf.ReservationId);

            modelBuilder.Entity<ReservationFoodItem>()
                .Property(rf => rf.TotalPrice)
                .HasColumnType("decimal(4,2)");

            modelBuilder.Entity<Reservation>()
                .Property(r => r.FirstName)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.LastName)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.Email)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.PhoneNumber)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.NumberOfPeople)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.ReservationDate)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .Property(r => r.ReservationTime)
                .IsRequired();
        }
    }
}
