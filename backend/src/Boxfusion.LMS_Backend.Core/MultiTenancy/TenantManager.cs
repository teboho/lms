using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using Boxfusion.LMS_Backend.Authorization.Users;
using Boxfusion.LMS_Backend.Editions;

namespace Boxfusion.LMS_Backend.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        public TenantManager(
            IRepository<Tenant> tenantRepository, 
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository, 
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore) 
            : base(
                tenantRepository, 
                tenantFeatureRepository, 
                editionManager,
                featureValueStore)
        {
        }
    }
}
