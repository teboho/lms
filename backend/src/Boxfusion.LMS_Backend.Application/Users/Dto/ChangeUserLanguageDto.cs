using System.ComponentModel.DataAnnotations;

namespace Boxfusion.LMS_Backend.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}