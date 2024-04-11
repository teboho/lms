using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Boxfusion.LMS_Backend.Domain;
using Microsoft.AspNetCore.Mvc;
using Abp.Authorization;
using Boxfusion.LMS_Backend.Services.Dtos;
using Boxfusion.LMS_Backend.Roles.Dto;

namespace Boxfusion.LMS_Backend.Services.StoredFileAppService
{
    public interface IStoredFileAppService : IApplicationService
    {
        Task<StoredFile> CreateStoredFile(StoredFileDto input);

        Task<IActionResult> UpdateStoredFile(Guid id, [FromForm] StoredFileDto input);

        Task<IActionResult> GetStoredFile(Guid id);

        Task<List<StoredFileDto>> GetAllFiles();
    }
}
