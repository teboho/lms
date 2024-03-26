using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Domain
{
    public class Category : Entity<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string location { get; set; }
    }
}
