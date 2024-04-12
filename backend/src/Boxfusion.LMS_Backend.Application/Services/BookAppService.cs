using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Notifications;
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
        private readonly IRepository<Author, Guid> _authorRepository;
        private readonly IRepository<Category, Guid> _categoryRepository;
        public BookAppService(
            IRepository<Book, Guid> repository, 
            IRepository<Inventory, Guid> inventoryRepository,
            IRepository<Author, Guid> authorRepository, 
            IRepository<Category, Guid> categoryRepository
        ) : base(repository)
        {
            _bookRepository = repository;
            _inventoryRepository = inventoryRepository;
            _authorRepository = authorRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<object> PostCreateBook(CreateBookDto bookInput)
        {
            if (bookInput == null)
            {
                throw new ArgumentNullException(nameof(bookInput));
            }

            if (bookInput.Id != Guid.Empty) {
                return new
                {
                    Message = "Book already exists!"
                };
            }

            if (bookInput.Author.Id == Guid.Empty)
            {
                // Add the category to the Categories table and get the id
                var author = new Author
                {
                    FirstName = bookInput.Author.FirstName,
                    LastName = bookInput.Author.LastName
                };

                _authorRepository.Insert(author);
                await CurrentUnitOfWork.SaveChangesAsync();
                bookInput.Author.Id = author.Id;
            }

            if (bookInput.Category.Id == Guid.Empty)
            {
                var category = new Category
                {
                    Description = bookInput.Category.Description,
                    Name = bookInput.Category.Name,
                    location = "Room1,Colum9"
                };

                _categoryRepository.Insert(category);
                await CurrentUnitOfWork.SaveChangesAsync();
                bookInput.Category.Id = category.Id;
            }

            int count = bookInput.Count;

            Book book = new Book
            {
                AuthorId = bookInput.Author.Id,
                CategoryId = bookInput.Category.Id,
                Name = bookInput.Name,
                Description = bookInput.Description,
                Type = bookInput.Type,
                Year = bookInput.Year,
                ImageURL = bookInput.ImageURL,
                ISBN = bookInput.ISBN

            };

            book = _bookRepository.Insert(book);
            await CurrentUnitOfWork.SaveChangesAsync();
                       
            Inventory inventory = new Inventory
            {
                BookId = book.Id,
                Count = count
            };

            inventory = _inventoryRepository.Insert(inventory);
            await CurrentUnitOfWork.SaveChangesAsync();

            return new {
                Book = book,
                Inventory = inventory
            };
        }

        public List<Book> SearchForBookByName(string term)
        {
            var books = _bookRepository.GetAll().Where(a => (a.Name.ToLower().Contains(term.ToLower()))).ToList();
            return books;
        }
        public List<Book> SearchForBookByDescription(string term)
        {
            var books = _bookRepository.GetAll().Where(a => (a.Description.ToLower().Contains(term.ToLower()))).ToList();
            return books;
        }

        // search by category
        public List<Book> SearchForBookByCategory(string term)
        {
            var books = _bookRepository.GetAll();
            var categories = _categoryRepository.GetAll().Where(a => a.Name.ToLower().Contains(term.ToLower()));
            var booksByCategory = from book in books
                                join category in categories on book.CategoryId equals category.Id
                                select book;
            return booksByCategory.ToList();
        }

        public List<Book> SearchForBookByAuthor(string term)
        {
            var books = _bookRepository.GetAll();
            var authors = _authorRepository.GetAll().Where(a => (a.FirstName.ToLower().Contains(term.ToLower()) || a.LastName.ToLower().Contains(term.ToLower())));
            var booksByAuthor = from book in books
                                join author in authors on book.AuthorId equals author.Id
                                select book;
            return booksByAuthor.ToList();
        }

        private bool IsISBNSearch(string term)
        {
            return (term.Length == 13 && term.All(char.IsDigit)) || (term.Length == 10 && term.All(char.IsDigit)) || (term.Length == 10 && term.ElementAt(9) == 'X');
        }

        public async Task<List<Book>> GetSearchBooks(string name)
        {
            if (IsISBNSearch(name))
            {
                var books = _bookRepository.GetAll().Where(a => a.ISBN == name).ToList();
                return books;
            }

            var searchByNameResults = SearchForBookByName(name);
            
            // search by description
            var searchByDescriptionResults = SearchForBookByDescription(name);
            searchByNameResults.AddRange(searchByDescriptionResults);
            // search by author
            var searchByAuthorResults = SearchForBookByAuthor(name);
            searchByNameResults.AddRange(searchByAuthorResults);
            // search by category
            var searchByCategoryResults = SearchForBookByCategory(name);
            searchByNameResults.AddRange(searchByCategoryResults);

            return searchByNameResults;
        }


        public async Task<List<Book>> GetSearchGoogleBooks(string name)
        {
            return SearchForBookByName(name);
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