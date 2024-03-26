using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Domain
{
    public class Book : Entity<Guid>
    {
        public string Name { get; set; }
        public string Description {  get; set; }
        public byte Type { get; set; } // 0 (physical) or 1 (ebook) or 3 (both)
        public long Year { get; set; }
        public string? ImageURL {  get; set; }
        public string ISBN { get; set; }
        public Guid CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public Category CategoryModel { get; set; }

        public Guid AuthorId { get; set; }
        [ForeignKey(nameof(AuthorId))]
        public Author AuthorModel { get; set; }
    }
}
