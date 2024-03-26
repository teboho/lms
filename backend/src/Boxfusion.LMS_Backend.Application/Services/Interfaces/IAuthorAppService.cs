using Abp.Application.Services;
using Boxfusion.LMS_Backend.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.Interfaces
{
    public interface IAuthorAppService : IAsyncCrudAppService<AuthorDto, Guid>
    {
    }
}
