using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Runtime.Session;
using Boxfusion.LMS_Backend.Authorization.Users;
using Boxfusion.LMS_Backend.Domain;
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

    public class AskGoogleAppService : LMS_BackendAppServiceBase, IAskGoogleAppService
    {
        static HttpClient client;
        IRepository<Book, Guid> _booksRepository;
        IRepository<Category, Guid> _catRepo;
        IRepository<Author, Guid> _authorRepo;
        private readonly Random _random;
        public AskGoogleAppService(IRepository<Book, Guid> bookRepository, IRepository<Category, Guid> catRepo, IRepository<Author, Guid> authorRepo)
        {
            _booksRepository = bookRepository;
            _catRepo = catRepo;
            _authorRepo = authorRepo;

            client = new HttpClient();
            _random = new Random();

            client.BaseAddress = new Uri("https://www.googleapis.com/books/v1/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        [AbpAuthorize]
        public async Task<Category> SearchCategory(string name)
        {
            return SearchForCategory(name);
        }
        public Category SearchForCategory(string name)
        {
            var category = _catRepo.GetAll().Where(c => c.Name.ToLower().Equals(name.ToLower())).FirstOrDefault();
            return category;
        }

        public async Task<Author> SearchAuthor(string firstname, string lastname)
        {
            return SearchForAuthor(firstname, lastname);
        }
        public Author SearchForAuthor(string firstname, string lastname)
        {
            var author = _authorRepo.GetAll().Where(a => (a.FirstName.ToLower().Equals(firstname) && a.LastName.ToLower().Equals(lastname.ToLower()))).FirstOrDefault();
            return author;
        }
        public Book SearchForBook(string name)
        {
            var book = _booksRepository.GetAll().Where(b => b.Name.ToLower().Equals(name.ToLower())).FirstOrDefault();
            return book;
        }

        public async Task<List<Category>> GetAllCategory()
        {
            var categorys = _catRepo.GetAll().ToList();
            return categorys;
        }

        public async Task<List<Book>> GetCount(int count = 50)
        {
            var books = await _booksRepository.GetAllListAsync();

            return books;
        }

        //public async Task<List<Book>> GetRandomBooksAsync(int count = 50)
        //{
        //    var books = new List<Book>();

        //    for (int i = 0; i < count; i++)
        //    {
        //        var categoryId = _random.Next(0, 10); // Adjust based on the number of categories

        //        var book = await GetRandomBookAsync(categoryId);
        //        if (book != null)
        //        {
        //            books.Add(book);
        //        }
        //    }

        //    return books;
        //}
        private async Task<Book> GetRandomBookAsync(Guid categoryId)
        {
            var startIndex = _random.Next(0, 1000); // Adjust based on the number of available books

            var response = await client.GetStringAsync($"volumes?q=*&startIndex={startIndex}&maxResults=1");

            var jsonResponse = JObject.Parse(response);
            var items = jsonResponse["items"];

            if (items != null && items.HasValues)
            {
                var book = items[0].ToObject<Book>();
                book.CategoryId = categoryId; // Assign category ID
                return book;
            }

            return null;
        }

        public async Task<string> TestPotter()
        {
            HttpResponseMessage response = await client.GetAsync(
                "volumes/s1gVAAAAYAAJ");

            return await response.Content.ReadAsStringAsync();
        }

        /// <summary>
        /// adding a newbook will require checking google apis
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public async Task<List<Tuple<Book, Category, Author>>> PoulateVolumes(string query)
        {
            var startIndex = _random.Next(0, 1000); // Adjust based on the number of available books
                                                    //HttpResponseMessage response = await client.GetAsync(
                                                    //    $"volumes?q={query}&startIndex={startIndex}&maxResults=30");
            #region run
            var volumes = await RunQuery(query, startIndex); // response.Content.ReadFromJsonAsync<Result>();
            var books = new List<Tuple<Book, Category, Author>>();
            #endregion
            if (volumes.Items != null)
            {
                if (volumes.Items.Count > 0)
                {
                    foreach (Volume v in volumes.Items)
                    {
                        // we need to search if such a category does not already exist in the categories db... same with Author
                        try
                        {
                            var firstAuthor = v.VolumeInfo.Authors.FirstOrDefault();
                            string first = "";
                            string last = "";
                            if (!firstAuthor.IsNullOrEmpty())
                            {
                                string[] split = firstAuthor.Split(' ');
                                first = split[0];
                                last = split[1];
                            }
                            Author author = SearchForAuthor(first, last);
                            if (author == null)
                            {
                                author = new Author
                                {
                                    FirstName = first,
                                    LastName = last,
                                };
                                // add to the database
                                author = _authorRepo.Insert(author);
                                CurrentUnitOfWork.SaveChanges();
                            }
                            string catName = v.VolumeInfo.Categories == null ? "Category" : (v.VolumeInfo.Categories[0] != null ? v.VolumeInfo.Categories[0] : "Category");
                            Category category = SearchForCategory(catName);
                            if (category == null)
                            {
                                category = new Category
                                {
                                    Name = v.VolumeInfo.Categories == null ? "Category" : (v.VolumeInfo.Categories[0] != null ? v.VolumeInfo.Categories[0] : "Category"),
                                    Description = catName,
                                    location = "Room4,Column7"
                                };
                                // add to the database
                                category = _catRepo.Insert(category);
                                CurrentUnitOfWork.SaveChanges();
                            }

                            Random random = new Random();
                            // random between 0 , 1 or 2
                            byte b = (byte)(random.Next(0, 3));
                            string strYear = v.VolumeInfo.PublishedDate == null ? "0000" : (v.VolumeInfo.PublishedDate.Split("-")[0]);
                            int intYear = int.Parse(strYear);
                            Book book = SearchForBook(v.VolumeInfo.Title);
                            if (book == null)
                            {
                                book = new Book
                                {
                                    Name = v.VolumeInfo.Title,
                                    Description = v.VolumeInfo.Description == null ? v.VolumeInfo.Subtitle : v.VolumeInfo.Description,
                                    ImageURL = v.VolumeInfo.ImageLinks == null ? "" : (v.VolumeInfo.ImageLinks.Thumbnail != null ? v.VolumeInfo.ImageLinks.Thumbnail : ""),
                                    ISBN = v.VolumeInfo.IndustryIdentifiers == null ? "" : (v.VolumeInfo.IndustryIdentifiers[1].Identifier != null ? v.VolumeInfo.IndustryIdentifiers[1].Identifier : ""),
                                    Type = b,
                                    Year = intYear,
                                    AuthorId = author.Id,
                                    CategoryId = category.Id
                                };
                                // add book to db
                                book = _booksRepository.Insert(book);
                                CurrentUnitOfWork.SaveChanges();
                            }
                            //books.Add(book);
                            Tuple<Book, Category, Author> tuple = new Tuple<Book, Category, Author>(book, category, author);
                            books.Add(tuple);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());
                        }
                    }
                }
            }
            
            return books;
        }

        public async Task<Result> RunQuery(string query, int startIndex)
        {
            HttpResponseMessage response = await client.GetAsync(
                $"volumes?q={query}&startIndex={startIndex}&maxResults=30");
            var volumes = await response.Content.ReadFromJsonAsync<Result>();
            return volumes;
        }

        [HttpGet]
        public async Task<List<Tuple<Book, Category, Author>>> SearchVolumes(string query)
        {
            var startIndex = _random.Next(0, 1000); // Adjust based on the number of available books
            HttpResponseMessage response = await client.GetAsync(
                $"volumes?q={query}&startIndex={startIndex}&maxResults=30");
            var volumes = await response.Content.ReadFromJsonAsync<Result>();
            var books = new List<Tuple<Book, Category, Author>>();

            if (volumes.Items != null)
            {
                if (volumes.Items.Count > 0)
                {
                    foreach (Volume v in volumes.Items)
                    {
                        // we need to search if such a category does not already exist in the categories db... same with Author
                        try
                        {
                            var firstAuthor = v.VolumeInfo.Authors.FirstOrDefault();
                            string first = "";
                            string last = "";
                            if (!firstAuthor.IsNullOrEmpty())
                            {
                                string[] split = firstAuthor.Split(' ');
                                first = split[0];
                                last = split[1];
                            }
                            Author author = SearchForAuthor(first, last);
                            if (author == null)
                            {
                                author = new Author
                                {
                                    FirstName = first,
                                    LastName = last,
                                };
                                // add to the database
                                // author = _authorRepo.Insert(author);
                                // CurrentUnitOfWork.SaveChanges();
                            }
                            string catName = v.VolumeInfo.Categories == null ? "Category" : (v.VolumeInfo.Categories[0] != null ? v.VolumeInfo.Categories[0] : "Category");
                            Category category = SearchForCategory(catName);
                            if (category == null)
                            {
                                category = new Category
                                {
                                    Name = v.VolumeInfo.Categories == null ? "Category" : (v.VolumeInfo.Categories[0] != null ? v.VolumeInfo.Categories[0] : "Category"),
                                    Description = catName,
                                    location = "Room4,Column7"
                                };
                                // add to the database
                                // category = _catRepo.Insert(category);
                                // CurrentUnitOfWork.SaveChanges();
                            }

                            Random random = new Random();
                            // random between 0 , 1 or 2
                            byte b = 0; //(byte)(random.Next(0, 3));
                            string strYear = v.VolumeInfo.PublishedDate == null ? "0000" : (v.VolumeInfo.PublishedDate.Split("-")[0]);
                            int intYear = int.Parse(strYear);
                            Book book = SearchForBook(v.VolumeInfo.Title);
                            if (book == null)
                            {
                                book = new Book
                                {
                                    Name = v.VolumeInfo.Title,
                                    Description = v.VolumeInfo.Description == null ? v.VolumeInfo.Subtitle : v.VolumeInfo.Description,
                                    ImageURL = v.VolumeInfo.ImageLinks == null ? "" : (v.VolumeInfo.ImageLinks.Thumbnail != null ? v.VolumeInfo.ImageLinks.Thumbnail : ""),
                                    ISBN = v.VolumeInfo.IndustryIdentifiers == null ? "" : (v.VolumeInfo.IndustryIdentifiers[1].Identifier != null ? v.VolumeInfo.IndustryIdentifiers[1].Identifier : ""),
                                    Type = b,
                                    Year = intYear,
                                    AuthorId = author.Id,
                                    CategoryId = category.Id
                                };
                                // add book to db
                                // book = _booksRepository.Insert(book);
                                // CurrentUnitOfWork.SaveChanges();
                            }
                            //books.Add(book);
                            Tuple<Book, Category, Author> tuple = new Tuple<Book, Category, Author>(book, category, author);
                            books.Add(tuple);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());
                        }
                    }
                }
            }

            return books;
        }

        static async Task RunAsync()
        {

        }

        //public class BulkReturn
        //{
        //    public List<Book> Book { get; set; }
        //    public Tuple<Book, Category, Author> tuple { get; set; }
        //}

        public class Result
        {
            public string Kind { get; set; }
            public int TotalItems { get; set; }
            public List<Volume> Items { get; set; }
        }
        public class Volume
        {
            public string Kind { get; set; }
            public string Id { get; set; }
            public string Etag { get; set; }
            public string SelfLink { get; set; }
            public VolumeInfo VolumeInfo { get; set; }
            public SaleInfo SaleInfo { get; set; }
            public AccessInfo AccessInfo { get; set; }
            public SearchInfo SearchInfo { get; set; }
        }

        public class VolumeInfo
        {
            public string Title { get; set; }
            public string Subtitle { get; set; }
            public List<string> Authors { get; set; }
            public string Publisher { get; set; }
            public string PublishedDate { get; set; }
            public string Description { get; set; }
            public List<IndustryIdentifier> IndustryIdentifiers { get; set; }
            public ReadingModes ReadingModes { get; set; }
            public int PageCount { get; set; }
            public string PrintType { get; set; }
            public List<string> Categories { get; set; }
            public string MaturityRating { get; set; }
            public bool AllowAnonLogging { get; set; }
            public string ContentVersion { get; set; }
            public PanelizationSummary PanelizationSummary { get; set; }
            public ImageLinks ImageLinks { get; set; }
            public string Language { get; set; }
            public string PreviewLink { get; set; }
            public string InfoLink { get; set; }
            public string CanonicalVolumeLink { get; set; }
        }

        public class IndustryIdentifier
        {
            public string Type { get; set; }
            public string Identifier { get; set; }
        }

        public class ReadingModes
        {
            public bool Text { get; set; }
            public bool Image { get; set; }
        }

        public class PanelizationSummary
        {
            public bool ContainsEpubBubbles { get; set; }
            public bool ContainsImageBubbles { get; set; }
        }

        public class ImageLinks
        {
            public string SmallThumbnail { get; set; }
            public string Thumbnail { get; set; }
        }

        public class SaleInfo
        {
            public string Country { get; set; }
            public string Saleability { get; set; }
            public bool IsEbook { get; set; }
            public ListPrice ListPrice { get; set; }
            public RetailPrice RetailPrice { get; set; }
            public string BuyLink { get; set; }
            public List<Offer> Offers { get; set; }
        }

        public class ListPrice
        {
            public double Amount { get; set; }
            public string CurrencyCode { get; set; }
        }

        public class RetailPrice
        {
            public double Amount { get; set; }
            public string CurrencyCode { get; set; }
        }

        public class Offer
        {
            public int FinskyOfferType { get; set; }
            public ListPrice ListPrice { get; set; }
            public RetailPrice RetailPrice { get; set; }
        }

        public class AccessInfo
        {
            public string Country { get; set; }
            public string Viewability { get; set; }
            public bool Embeddable { get; set; }
            public bool PublicDomain { get; set; }
            public string TextToSpeechPermission { get; set; }
            public Epub Epub { get; set; }
            public Pdf Pdf { get; set; }
            public string WebReaderLink { get; set; }
            public string AccessViewStatus { get; set; }
            public bool QuoteSharingAllowed { get; set; }
        }

        public class Epub
        {
            public bool IsAvailable { get; set; }
            public string AcsTokenLink { get; set; }
        }

        public class Pdf
        {
            public bool IsAvailable { get; set; }
            public string AcsTokenLink { get; set; }
        }

        public class SearchInfo
        {
            public string TextSnippet { get; set; }
        }

    }
}
