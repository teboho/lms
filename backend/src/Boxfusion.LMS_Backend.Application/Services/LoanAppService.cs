using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Boxfusion.LMS_Backend.Domain;
using Boxfusion.LMS_Backend.Services.Dtos;
using Boxfusion.LMS_Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services
{

    [AbpAuthorize] // should use Pages.Loan permission for example...
    public class LoanAppService : AsyncCrudAppService<Loan, LoanDto, Guid>, ILoanAppService
    {
        private readonly IRepository<Loan, Guid> _repository;
        private readonly IRepository<Inventory, Guid> _inventoryRepository;
        public LoanAppService(IRepository<Loan, Guid> repository, IRepository<Inventory, Guid> inventoryRepository) : base(repository)
        {
            _repository = repository;
            _inventoryRepository = inventoryRepository;
        }

        // when creating a loan, the book inventory should be updated (subtract inventory count by 1)
        public async Task<LoanDto> CreateLoan(LoanDto input)
        {
            var loan = ObjectMapper.Map<Loan>(input);
            await _repository.InsertAsync(loan);

            var inventory = await _inventoryRepository.FirstOrDefaultAsync(x => x.BookId == loan.BookId);
            inventory.Count -= 1;
            await _inventoryRepository.UpdateAsync(inventory);

            return ObjectMapper.Map<LoanDto>(loan);
        }

        /// <summary>
        /// when submitting a loan, the book inventory should be updated (add inventory count by 1)
        /// </summary>
        /// <param name="id">loan id</param>
        /// <returns>the updated loan</returns>
        [HttpGet]
        public async Task<LoanDto> ReturnLoan(Guid id)
        {
            var loan = await _repository.GetAsync(id);
            loan.IsReturned = true;
            loan.DateReturned = DateTime.Now;
            await _repository.UpdateAsync(loan);

            var inventory = await _inventoryRepository.FirstOrDefaultAsync(x => x.BookId == loan.BookId);
            inventory.Count += 1;
            await _inventoryRepository.UpdateAsync(inventory);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<LoanDto>(loan);
        }

        public async Task<List<LoanDto>> GetByBook(Guid bookId)
        {
            var loans = await _repository.GetAllListAsync(x => x.BookId == bookId);
            return ObjectMapper.Map<List<LoanDto>>(loans);
        }

        public async Task<List<LoanDto>> GetByPatron(long patronId)
        {
            var loans = await _repository.GetAllListAsync(x => x.PatronId == patronId);
            return ObjectMapper.Map<List<LoanDto>>(loans);
        }

        public async Task<List<LoanDto>> GetReturned()
        {
            var loans = await _repository.GetAllListAsync(x => x.IsReturned == true);
            return ObjectMapper.Map<List<LoanDto>>(loans);
        }
    }
}
