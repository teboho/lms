using AutoMapper;
using Boxfusion.LMS_Backend.Domain;
using Boxfusion.LMS_Backend.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services.StoredFileAppService
{
    public class StoredFileMappingProfile : Profile
    {
        public StoredFileMappingProfile() 
        {
            CreateMap<StoredFileDto, StoredFile>()
                .ForMember(member => member.Id, action => action.Ignore());
        }
    }
}
