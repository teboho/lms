using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Boxfusion.LMS_Backend.EntityFrameworkCore
{
    public static class LMS_BackendDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<LMS_BackendDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<LMS_BackendDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
