using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace Boxfusion.LMS_Backend.Localization
{
    public static class LMS_BackendLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(LMS_BackendConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(LMS_BackendLocalizationConfigurer).GetAssembly(),
                        "Boxfusion.LMS_Backend.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
