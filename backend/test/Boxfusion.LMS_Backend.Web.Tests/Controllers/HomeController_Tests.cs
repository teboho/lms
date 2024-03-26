using System.Threading.Tasks;
using Boxfusion.LMS_Backend.Models.TokenAuth;
using Boxfusion.LMS_Backend.Web.Controllers;
using Shouldly;
using Xunit;

namespace Boxfusion.LMS_Backend.Web.Tests.Controllers
{
    public class HomeController_Tests: LMS_BackendWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}