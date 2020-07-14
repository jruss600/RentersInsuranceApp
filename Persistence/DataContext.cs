using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }

        // protected override void OnModelCreating(ModelBuilder builder) {
        //     builder.Entity<Item>()
        //         .HasData(
        //             new Item {Name = "TV", Value = 2000, Category = "Electronics"},
        //             new Item {Name = "Playstation", Value = 400, Category = "Electronics"},
        //             new Item {Name = "Stereo", Value = 1600, Category = "Electronics"},
        //             new Item {Name = "Shirts", Value = 1100, Category = "Clothing"},
        //             new Item {Name = "Jeans", Value = 1100, Category = "Clothing"},
        //             new Item {Name = "Pots and Pans", Value = 3000, Category = "Kitchen"},
        //             new Item {Name = "Flatware", Value = 500, Category = "Kitchen"},
        //             new Item {Name = "Knife Set", Value = 500, Category = "Kitchen"},
        //             new Item {Name = "Misc", Value = 1000, Category = "Kitchen"}
        //         );
        // }
    }
}
