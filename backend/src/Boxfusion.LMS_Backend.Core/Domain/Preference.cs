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
    public class Preference : Entity<Guid>
    {
        public long PatronId { get; set; }
        [ForeignKey(nameof(PatronId))]
        public User UserModel { get; set; }

        public Guid PrimaryCategoryId { get; set; }
        [ForeignKey(nameof(PrimaryCategoryId))]
        public Category PrimaryCategory { get; set; }

        public Guid SecondaryCategoryId { get; set; }
        [ForeignKey(nameof(SecondaryCategoryId))]
        public Category SecondaryCategory { get; set; }

        public Guid TertiaryCategoryId { get; set; }
        [ForeignKey(nameof(TertiaryCategoryId))]
        public Category TertiaryCategory { get; set; }
    }
}
