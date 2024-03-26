using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Boxfusion.LMS_Backend.Authorization;

namespace Boxfusion.LMS_Backend
{
    [DependsOn(
        typeof(LMS_BackendCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class LMS_BackendApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<LMS_BackendAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(LMS_BackendApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
