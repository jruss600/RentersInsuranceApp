using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Items.Any())
            {
                var items = new List<Item>
                {
                    new Item {Name = "TV", Value = 2000, Category = "Electronics"},
                    new Item {Name = "Playstation", Value = 400, Category = "Electronics"},
                    new Item {Name = "Stereo", Value = 1600, Category = "Electronics"},
                    new Item {Name = "Shirts", Value = 1100, Category = "Clothing"},
                    new Item {Name = "Jeans", Value = 1100, Category = "Clothing"},
                    new Item {Name = "Pots and Pans", Value = 3000, Category = "Kitchen"},
                    new Item {Name = "Flatware", Value = 500, Category = "Kitchen"},
                    new Item {Name = "Knife Set", Value = 500, Category = "Kitchen"},
                    new Item {Name = "Misc", Value = 1000, Category = "Kitchen"}
                };
                context.Items.AddRange(items);
                context.SaveChanges();
            }
        }
    }
}