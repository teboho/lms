using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Boxfusion.LMS_Backend.Configuration.Dto;

namespace Boxfusion.LMS_Backend.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : LMS_BackendAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
