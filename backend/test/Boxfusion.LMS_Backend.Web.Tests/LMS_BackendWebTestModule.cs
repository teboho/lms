using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Boxfusion.LMS_Backend.EntityFrameworkCore;
using Boxfusion.LMS_Backend.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Boxfusion.LMS_Backend.Web.Tests
{
    [DependsOn(
        typeof(LMS_BackendWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class LMS_BackendWebTestModule : AbpModule
    {
        public LMS_BackendWebTestModule(LMS_BackendEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(LMS_BackendWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(LMS_BackendWebMvcModule).Assembly);
        }
    }
}