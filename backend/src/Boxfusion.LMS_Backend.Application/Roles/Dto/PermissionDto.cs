using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Authorization;
using System;

namespace Boxfusion.LMS_Backend.Roles.Dto
{
    [AutoMapFrom(typeof(Permission))]
    public class PermissionDto : EntityDto<Guid>
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }
    }
}
