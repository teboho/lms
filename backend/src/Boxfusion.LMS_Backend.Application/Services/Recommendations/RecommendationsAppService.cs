using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Runtime.Session;
using Boxfusion.LMS_Backend.Authorization.Users;
using Boxfusion.LMS_Backend.Domain;
using Boxfusion.LMS_Backend.Services.Dtos;
using Boxfusion.LMS_Backend.Sessions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Reflection.Metadata.BlobBuilder;

namespace Boxfusion.LMS_Backend.Services.AskGoogle
{

    public class RecommendationsAppService : LMS_BackendAppServiceBase, IRecommendationsAppService
    {
        static HttpClient client;
        IRepository<Book, Guid> _booksRepository;
        IRepository<Category, Guid> _catRepo;
        IRepository<Preference, Guid> _prefRepository;
        IRepository<History, Guid> _historyRepo;
        private readonly Random _random;
        public RecommendationsAppService(IRepository<Book, Guid> bookRepository, IRepository<Category, Guid> catRepo, IRepository<Preference, Guid> prefRepository, IRepository<History, Guid> historyRepo)
        {
            _booksRepository = bookRepository;
            _catRepo = catRepo;
            _prefRepository = prefRepository;
            _historyRepo = historyRepo;
        }


        /// <summary>
        /// Recommend books to a user based on their preferences and the books they have read (history)
        /// Theses will be 10 books:
        /// we will upto the 5 most prevalent categories in the user's history,
        /// then we will calculate the percentage of each category in the user's history.
        /// then we will get the books of those categories and put them in a list by percentage above.
        /// then we will check the user's preferences and get the books of those categories and put them in a list by percentage above.
        /// 3 books for primary category, 2 books for secondary category, 1 book for tertiary category
        /// </summary>  
        public async Task<List<object>> RecommendBooks(int _userId)
        {
            var userId = _userId;
            
            // get the user's data
            var userHistory = await _historyRepo.GetAllListAsync(x => x.PatronId == userId);
            var userPreferences = await _prefRepository.FirstOrDefaultAsync(x => x.PatronId == userId);

            // categories in user's history
            var categories = from history in userHistory
                             join book in _booksRepository.GetAllList() on history.BookId equals book.Id
                             join cat in _catRepo.GetAllList() on book.CategoryId equals cat.Id
                             select cat;

            // get the 5 most prevalent categories in the user's history
            var prevalentCategories = categories.GroupBy(x => x.Id).OrderByDescending(x => x.Count()).Take(5);

            // calculate the percentage of each category in the user's history
            var totalCategories = categories.Count();
            var categoryPercentages = prevalentCategories.Select(x => new { Category = x.Key, Percentage = (x.Count() / totalCategories) * 100 });

            //// get 10 books based on the category percentages
            //var result = new List<Book>();
            //foreach (var category in categoryPercentages)
            //{
            //    var books = await _booksRepository.GetAllListAsync(x => x.CategoryId == category.Category);
            //    var booksByPercentage = books.OrderBy(x => _random.Next()).Take((int)(category.Percentage / 10));
            //    result.AddRange(booksByPercentage);
            //}

            return categoryPercentages.ToList<object>();
        }
         
    }
}
