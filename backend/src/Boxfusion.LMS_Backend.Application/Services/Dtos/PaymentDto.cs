
using Abp.Application.Services.Dto;
using Boxfusion.LMS_Backend.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.Dtos
{
    public class PaymentDto : EntityDto<Guid>
    {
        public long LoanId { get; set; }
        public DateTime DateCreated { get; set; }
        public float Amount { get; set; }
    }
}
