using Abp.Domain.Entities;
using Boxfusion.LMS_Backend.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Domain
{
    public class History : Entity<Guid>
    {
        public long PatronId { get; set; }
        [ForeignKey(nameof(PatronId))]
        public User UserModel { get; set; }
        public DateTime DateRead { get; set; }
        public Guid BookId { get; set; }
        [ForeignKey(nameof(BookId))]
        public Book BookModel { get; set; }
    }
}
