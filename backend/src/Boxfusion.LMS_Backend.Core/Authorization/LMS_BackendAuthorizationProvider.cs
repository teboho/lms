using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace Boxfusion.LMS_Backend.Authorization
{
    public class LMS_BackendAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            // Add new permissions here (must be registered in the PermissionNames)
            context.CreatePermission(PermissionNames.Patron_Preferences, L("PatronPreferences"));
            context.CreatePermission(PermissionNames.Patron_History, L("PatronHistory"));   
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, LMS_BackendConsts.LocalizationSourceName);
        }
    }
}
