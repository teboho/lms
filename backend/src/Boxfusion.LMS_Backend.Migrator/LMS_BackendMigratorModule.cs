using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Boxfusion.LMS_Backend.Configuration;
using Boxfusion.LMS_Backend.EntityFrameworkCore;
using Boxfusion.LMS_Backend.Migrator.DependencyInjection;

namespace Boxfusion.LMS_Backend.Migrator
{
    [DependsOn(typeof(LMS_BackendEntityFrameworkModule))]
    public class LMS_BackendMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public LMS_BackendMigratorModule(LMS_BackendEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(LMS_BackendMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                LMS_BackendConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(LMS_BackendMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
