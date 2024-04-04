using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.LMS_Backend.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.Dtos
{
    [AutoMap(typeof(Preference))]
    public class PreferenceDto : EntityDto<Guid>
    {
        public long PatronId { get; set; }
        public Guid PrimaryCategoryId { get; set; }
        public Guid SecondaryCategoryId { get; set; }
        public Guid TertiaryCategoryId { get; set; }
    }
}
