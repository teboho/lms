FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/Boxfusion.LMS_Backend.Web.Host/Boxfusion.LMS_Backend.Web.Host.csproj", "src/Boxfusion.LMS_Backend.Web.Host/"]
COPY ["src/Boxfusion.LMS_Backend.Web.Core/Boxfusion.LMS_Backend.Web.Core.csproj", "src/Boxfusion.LMS_Backend.Web.Core/"]
COPY ["src/Boxfusion.LMS_Backend.Application/Boxfusion.LMS_Backend.Application.csproj", "src/Boxfusion.LMS_Backend.Application/"]
COPY ["src/Boxfusion.LMS_Backend.Core/Boxfusion.LMS_Backend.Core.csproj", "src/Boxfusion.LMS_Backend.Core/"]
COPY ["src/Boxfusion.LMS_Backend.EntityFrameworkCore/Boxfusion.LMS_Backend.EntityFrameworkCore.csproj", "src/Boxfusion.LMS_Backend.EntityFrameworkCore/"]
WORKDIR "/src/src/Boxfusion.LMS_Backend.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/Boxfusion.LMS_Backend.Web.Host", "src/Boxfusion.LMS_Backend.Web.Host"]
COPY ["src/Boxfusion.LMS_Backend.Web.Core", "src/Boxfusion.LMS_Backend.Web.Core"]
COPY ["src/Boxfusion.LMS_Backend.Application", "src/Boxfusion.LMS_Backend.Application"]
COPY ["src/Boxfusion.LMS_Backend.Core", "src/Boxfusion.LMS_Backend.Core"]
COPY ["src/Boxfusion.LMS_Backend.EntityFrameworkCore", "src/Boxfusion.LMS_Backend.EntityFrameworkCore"]
WORKDIR "/src/src/Boxfusion.LMS_Backend.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "Boxfusion.LMS_Backend.Web.Host.dll"]
