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
    public class Assistant : Entity<Guid>
    {
        public long UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User UserModel { get; set; }
    }
}
