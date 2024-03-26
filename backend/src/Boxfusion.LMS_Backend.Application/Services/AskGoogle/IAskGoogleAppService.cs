using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.AskGoogle
{
    public interface IAskGoogleAppService : IApplicationService
    {
        Task<string> TestPotter();
    }
}
