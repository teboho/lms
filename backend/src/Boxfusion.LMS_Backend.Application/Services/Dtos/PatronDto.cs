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
    [AutoMap(typeof(Patron))]
    public class PatronDto : EntityDto<Guid>
    {
        public bool Verified { get; set; }

        public long UserId { get; set; }
    }
}
