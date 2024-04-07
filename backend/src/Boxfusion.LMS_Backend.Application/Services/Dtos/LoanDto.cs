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
        public long PatronId { get; set; }
        public Guid BookId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateDue { get; set; }
        public DateTime? DateReturned { get; set; }
        public bool IsReturned { get; set; }
        public bool IsOverdue { get; set; }
        public bool Confirmed { get; set; } // this is for the librarian to confirm the loan
    }
}
