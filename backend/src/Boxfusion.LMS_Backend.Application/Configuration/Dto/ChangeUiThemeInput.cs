using System.ComponentModel.DataAnnotations;

namespace Boxfusion.LMS_Backend.Configuration.Dto
{
    public class ChangeUiThemeInput
    {
        [Required]
        [StringLength(32)]
        public string Theme { get; set; }
    }
}
