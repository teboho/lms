using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.LMS_Backend.Domain;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.Dtos
{
    [AutoMap(typeof(StoredFile))]
    public class StoredFileDto : EntityDto<Guid>
    {
        public IFormFile File { get; set; }
        public string FileName { get; set; }
    }
}
