using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Boxfusion.LMS_Backend.Authorization.Roles;
using Boxfusion.LMS_Backend.Authorization.Users;
using Boxfusion.LMS_Backend.MultiTenancy;
using Boxfusion.LMS_Backend.Domain;

namespace Boxfusion.LMS_Backend.EntityFrameworkCore
{
    public class LMS_BackendDbContext : AbpZeroDbContext<Tenant, Role, User, LMS_BackendDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Category> Categories { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<History> Histories { get; set; }
        public DbSet<Preference> Preferences { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Inventory> InventoryData { get; set; }

        public LMS_BackendDbContext(DbContextOptions<LMS_BackendDbContext> options)
            : base(options)
        {
        }
    }
}
