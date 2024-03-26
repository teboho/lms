using Abp.Authorization;
using Boxfusion.LMS_Backend.Authorization.Roles;
using Boxfusion.LMS_Backend.Authorization.Users;

namespace Boxfusion.LMS_Backend.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
