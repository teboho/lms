using Abp.MultiTenancy;
using Boxfusion.LMS_Backend.Authorization.Users;

namespace Boxfusion.LMS_Backend.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}
