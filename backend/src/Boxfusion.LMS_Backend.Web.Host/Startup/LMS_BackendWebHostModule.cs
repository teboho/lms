using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Boxfusion.LMS_Backend.Configuration;

namespace Boxfusion.LMS_Backend.Web.Host.Startup
{
    [DependsOn(
       typeof(LMS_BackendWebCoreModule))]
    public class LMS_BackendWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public LMS_BackendWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(LMS_BackendWebHostModule).GetAssembly());
        }
    }
}
