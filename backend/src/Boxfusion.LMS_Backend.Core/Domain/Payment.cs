using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Domain
{
    public class Payment : Entity<Guid>
    {
        public Guid LoanId { get; set; }
        [ForeignKey(nameof(LoanId))]
        public Loan LoanModel { get; set; }
        public DateTime DateCreated { get; set; }
        public float Amount { get; set; }

        public Payment()
        {
            DateCreated = DateTime.Now;
        }
    }
}
