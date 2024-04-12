using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using AutoMapper.Internal.Mappers;
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
    public class UserFileStoreAppService : AsyncCrudAppService<UserFileStore, UserFileStoreDto, Guid>, IUserFileStoreAppService
    {
        public IRepository<UserFileStore, Guid> _repository;
        public UserFileStoreAppService(IRepository<UserFileStore, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<UserFileStoreDto> CreateUserFileStore(UserFileStoreDto input)
        {
            if (input != null)
            {
                var mappedInput = ObjectMapper.Map<UserFileStore>(input);
                var bridgeRecord = _repository.GetAll().FirstOrDefault(x => x.UserId == mappedInput.UserId);
                if (bridgeRecord == null) 
                {
                    await _repository.InsertAsync(mappedInput);
                    CurrentUnitOfWork.SaveChanges();
                    return ObjectMapper.Map<UserFileStoreDto>(mappedInput);
                }
                bridgeRecord.FileId = mappedInput.FileId;
                await _repository.UpdateAsync(bridgeRecord);
                CurrentUnitOfWork.SaveChanges();
                return ObjectMapper.Map<UserFileStoreDto>(bridgeRecord);
            }
            return null;
        }

        public async Task<UserFileStoreDto> GetUserFileStore(int userId)
        {
            var bridgeRecord = _repository.GetAll().FirstOrDefault(x => x.UserId == userId);
            if (bridgeRecord != null)
            {
                return ObjectMapper.Map<UserFileStoreDto>(bridgeRecord);
            }
            return null;
        }
    }
}
