using Abp.Application.Services;
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
    public class BookAppService : AsyncCrudAppService<Book, BookDto, Guid>, IBookAppService
    {
        IRepository<Book, Guid> _bookRepository;
        public BookAppService(IRepository<Book, Guid> repository) : base(repository)
        {
            _bookRepository = repository;
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
    }
}
