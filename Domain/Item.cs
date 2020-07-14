using System;

namespace Domain
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public string Category { get; set; }
    }
}
