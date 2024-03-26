using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Domain
{
    public class Author : Entity<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
