using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NorthDineRestaurant.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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

            // Value converter for List<string> to comma-separated string and vice versa
            var stringListConverter = new ValueConverter<List<string>, string>(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            // Value comparer for List<string>
            var stringListComparer = new ValueComparer<List<string>>(
                (c1, c2) => c1 == null && c2 == null || (c1 != null && c2 != null && c1.SequenceEqual(c2)),
                c => c == null ? 0 : c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                c => c == null ? new List<string>() : new List<string>(c));

            // Apply the value converter and comparer to the FoodItem entity
            modelBuilder.Entity<FoodItem>()
                .Property(f => f.Ingredients)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);

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
                .Property(f => f.ImageUrl)
                .IsRequired();

            modelBuilder.Entity<FoodItem>()
                .Property(f => f.Category)
                .IsRequired();
        }
    }
}
