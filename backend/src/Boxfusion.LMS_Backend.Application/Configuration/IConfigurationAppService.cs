using System.Threading.Tasks;
using Boxfusion.LMS_Backend.Configuration.Dto;

namespace Boxfusion.LMS_Backend.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
