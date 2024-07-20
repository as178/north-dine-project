using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Data
{
    public class FoodItemContext : DbContext
    {
        public DbSet<FoodItem> FoodItems { get; set; }

        public FoodItemContext(DbContextOptions<FoodItemContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<FoodItem>()
                .Property(f => f.Price)
                .HasColumnType("decimal(4,2)");

            modelBuilder.Entity<FoodItem>()
                .Property(f => f.Title)
                .IsRequired();

            modelBuilder.Entity<FoodItem>()
                .Property(f => f.ShortDescription)
                .IsRequired();

            modelBuilder.Entity<FoodItem>()
                .Property(f => f.Ingredients)
                .IsRequired();

            modelBuilder.Entity<FoodItem>()
                .Property(f => f.ImageUrl)
                .IsRequired(false);
        }
    }
}
