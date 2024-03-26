using System.Collections.Generic;

namespace Boxfusion.LMS_Backend.Authentication.External
{
    public interface IExternalAuthConfiguration
    {
        List<ExternalLoginProviderInfo> Providers { get; }
    }
}
