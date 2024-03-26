using System.Threading.Tasks;
using Abp.Application.Services;
using Boxfusion.LMS_Backend.Authorization.Accounts.Dto;

namespace Boxfusion.LMS_Backend.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
