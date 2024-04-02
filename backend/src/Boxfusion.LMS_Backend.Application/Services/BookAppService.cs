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
    [AbpAuthorize]
    public class BookAppService : AsyncCrudAppService<Book, BookDto, Guid>, IBookAppService
    {
        private readonly IRepository<Book, Guid> _bookRepository;
        private readonly IRepository<Inventory, Guid> _inventoryRepository;
        public BookAppService(IRepository<Book, Guid> repository, IRepository<Inventory, Guid> inventoryRepository) : base(repository)
        {
            _bookRepository = repository;
            _inventoryRepository = inventoryRepository;
        }

        public List<Book> SearchForBook(string term)
        {
            var books = _bookRepository.GetAll().Where(a => (a.Name.ToLower().Contains(term.ToLower()))).ToList();
            return books;
        }
        public async Task<List<Book>> GetSearchBooks(string name)
        {
            return SearchForBook(name);
        }

        /// <summary>
        /// Get all books but for each just the id and the type
        /// </summary>
        public List<BookDto> GetBooksIdAndType()
        {
            var books = _bookRepository.GetAllList();
            var booksDto = ObjectMapper.Map<List<BookDto>>(books);
            return booksDto;
        }

        /// <summary>
        /// Get Printed books or those that are printed and digital
        /// </summary>
        public List<ShortBookDto> GetPrinted()
        {
            var books = _bookRepository.GetAllList();
            var booksDto = ObjectMapper.Map<List<Book>>(books);

            var printedBooks = booksDto.Where(a => a.Type != 1)
                .Select(b => new ShortBookDto{ Id = b.Id, Type = b.Type })
                .ToList();
            return printedBooks;
        }

        /// <summary>
        /// Fill in the inventory table with the books, size 50 each
        /// </summary>
        public async Task GetFillInventory()
        {
            var books = GetPrinted();
            foreach (var book in books)
            {
                var inventory = new Inventory
                {
                    BookId = book.Id,
                    Count = 50
                };
                _inventoryRepository.Insert(inventory);
            }

            await CurrentUnitOfWork.SaveChangesAsync();
        }
    }
}