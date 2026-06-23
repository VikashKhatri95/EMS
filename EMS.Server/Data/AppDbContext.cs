using EMS.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace EMS.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // This creates a table called "Employees" in the database
        public DbSet<Employee> Employees { get; set; }
    }
}
