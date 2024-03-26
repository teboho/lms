using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.LMS_Backend.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.Dtos
{
    [AutoMap(typeof(Author))]
    public class AuthorDto : EntityDto<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
