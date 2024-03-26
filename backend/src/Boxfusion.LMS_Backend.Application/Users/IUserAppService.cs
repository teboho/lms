using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Boxfusion.LMS_Backend.Roles.Dto;
using Boxfusion.LMS_Backend.Users.Dto;

namespace Boxfusion.LMS_Backend.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task DeActivate(EntityDto<long> user);
        Task Activate(EntityDto<long> user);
        Task<ListResultDto<RoleDto>> GetRoles();
        Task ChangeLanguage(ChangeUserLanguageDto input);

        Task<bool> ChangePassword(ChangePasswordDto input);
    }
}
