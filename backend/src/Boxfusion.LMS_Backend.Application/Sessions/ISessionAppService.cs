using System.Threading.Tasks;
using Abp.Application.Services;
using Boxfusion.LMS_Backend.Sessions.Dto;

namespace Boxfusion.LMS_Backend.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
