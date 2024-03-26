using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.LMS_Backend.Domain;
using Boxfusion.LMS_Backend.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services
{
    public class PreferenceAppService : AsyncCrudAppService<Preference, PreferenceDto, Guid>
    {
        public PreferenceAppService(IRepository<Preference, Guid> repository) : base(repository)
        { }
    }
}
