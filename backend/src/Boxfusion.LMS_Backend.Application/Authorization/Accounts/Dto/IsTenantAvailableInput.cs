using System.ComponentModel.DataAnnotations;
using Abp.MultiTenancy;

namespace Boxfusion.LMS_Backend.Authorization.Accounts.Dto
{
    public class IsTenantAvailableInput
    {
        [Required]
        [StringLength(AbpTenantBase.MaxTenancyNameLength)]
        public string TenancyName { get; set; }
    }
}
