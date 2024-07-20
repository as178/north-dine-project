using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Models;

namespace NorthDineRestaurant.Data
{
    public class ReviewContext : DbContext
    {
        public ReviewContext(DbContextOptions<ReviewContext> options) : base(options) { }

        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Review>()
                .HasKey(r => r.Id);

            modelBuilder.Entity<Review>()
                .Property(r => r.Title)
                .IsRequired();

            modelBuilder.Entity<Review>()
                .Property(r => r.Body)
                .IsRequired();

            modelBuilder.Entity<Review>()
                .Property(r => r.UserName)
                .IsRequired();

            modelBuilder.Entity<Review>()
                .Property(r => r.UserInitial)
                .HasComputedColumnSql("UPPER(SUBSTRING(UserName, 1, 1))", stored: true); // SQL computation
        }
    }
}
