using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using Boxfusion.LMS_Backend.Domain;
using Boxfusion.LMS_Backend.Services.Dtos;
using Boxfusion.LMS_Backend.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services
{
    public class AuthorAppService : AsyncCrudAppService<Author, AuthorDto, Guid>, IAuthorAppService
    {
        public IRepository<Author, Guid> _repository;
        public AuthorAppService(IRepository<Author, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
