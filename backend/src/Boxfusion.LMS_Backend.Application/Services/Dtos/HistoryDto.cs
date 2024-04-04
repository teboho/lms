using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Boxfusion.LMS_Backend.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.Dtos
{
    [AutoMap(typeof(History))]
    public class HistoryDto : EntityDto<Guid>
    {
        public long PatronId { get; set; }
        public DateTime DateRead { get; set; }
        public Guid BookId { get; set; }
    }
}
