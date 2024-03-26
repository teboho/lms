using Boxfusion.LMS_Backend.Debugging;

namespace Boxfusion.LMS_Backend
{
    public class LMS_BackendConsts
    {
        public const string LocalizationSourceName = "LMS_Backend";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "c81dc9f2b6a04c098ebfcdaea8e4cb40";
    }
}
