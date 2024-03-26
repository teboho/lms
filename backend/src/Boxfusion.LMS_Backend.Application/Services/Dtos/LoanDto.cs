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
    [AutoMap(typeof(Loan))]
    public class LoanDto : EntityDto<Guid>
    {
        public Guid PatronId { get; set; }
        public long BookId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
