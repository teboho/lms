using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Boxfusion.LMS_Backend.Controllers
{
    public abstract class LMS_BackendControllerBase: AbpController
    {
        protected LMS_BackendControllerBase()
        {
            LocalizationSourceName = LMS_BackendConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
