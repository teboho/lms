using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
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
    /// Application service for history data
    /// Requires authorization
    /// </summary>
    [AbpAuthorize]
    public class HistoryAppService : AsyncCrudAppService<History, HistoryDto, Guid>, IHistoryAppService
    {
        IRepository<History, Guid> _repository;
        /// <summary>
        /// dependency injection
        /// constructor
        /// </summary>
        /// <param name="repository">history data repository</param>
        public HistoryAppService(IRepository<History, Guid> repository) : base(repository) 
        { 
            _repository = repository;
        }

        public async Task<List<HistoryDto>> GetByBook(Guid bookId)
        {
            var histories = await _repository.GetAllListAsync(x => x.BookId == bookId);
            return ObjectMapper.Map<List<HistoryDto>>(histories).OrderByDescending(h => h.DateRead).ToList();
        }

        public async Task<List<HistoryDto>> GetByPatron(long patronId)
        {
            var histories = await _repository.GetAllListAsync(x => x.PatronId == patronId);
            return ObjectMapper.Map<List<HistoryDto>>(histories).OrderByDescending(h => h.DateRead).ToList();
        }
    }
}
