using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Boxfusion.LMS_Backend.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.Dtos
{
    [AutoMap(typeof(Category))]
    public class CategoryDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string location { get; set; }
    }
}
