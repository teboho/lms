using Abp.Application.Services.Dto;

namespace Boxfusion.LMS_Backend.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

