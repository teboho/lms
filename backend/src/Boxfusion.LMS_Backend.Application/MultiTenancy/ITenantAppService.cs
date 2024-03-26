using Abp.Application.Services;
using Boxfusion.LMS_Backend.MultiTenancy.Dto;

namespace Boxfusion.LMS_Backend.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

