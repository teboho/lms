using Abp.Application.Services;
using Abp.Authorization;
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
    /// <summary>
    /// For the metadata of the file
    /// </summary>
    [AbpAuthorize]
    public class FileStoreAppService : AsyncCrudAppService<StoredFile, StoredFileDto, Guid>
    {
        public IRepository<StoredFile, Guid> _repository;
        public FileStoreAppService(IRepository<StoredFile, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        // overide the create method to add the file to the database only if the file is not null and does not exist in the database
        public override async Task<StoredFileDto> CreateAsync(StoredFileDto input)
        {
            if (input.File != null)
            {
                var file = ObjectMapper.Map<StoredFile>(input);
                var fileExists = _repository.GetAll().Any(x => x.FileName == file.FileName);
                if (!fileExists)
                {
                    await _repository.InsertAsync(file);
                    return ObjectMapper.Map<StoredFileDto>(file);
                }
            }
            return null;
        }
    }
}
