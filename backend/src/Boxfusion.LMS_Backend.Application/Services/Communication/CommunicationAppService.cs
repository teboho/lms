using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Runtime.Session;
using Boxfusion.LMS_Backend.Authorization.Users;
using Boxfusion.LMS_Backend.Domain;
using Boxfusion.LMS_Backend.Services.Dtos;
using Boxfusion.LMS_Backend.Sessions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Reflection.Metadata.BlobBuilder;
using Azure;
using Azure.Communication;
using Azure.Communication.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http;

namespace Boxfusion.LMS_Backend.Services.Communication
{
    [AbpAuthorize]
    public class CommunicationAppService : LMS_BackendAppServiceBase, ICommunicationAppService
    {
        IConfiguration Configuration;
        string connectionString = "Server=";

        public CommunicationAppService(IConfiguration configuration)
        {
            Configuration = configuration;
            // from the appsettings.json file
            connectionString = Configuration["ConnectionStrings:ACS"];
        }

        public class EmailDto
        {
            public string Subject { get; set; } = "Hello from Azure Communication Services";
            public string Message { get; set; } = "Hello from C#";
            public string ToEmail { get; set; } = "teboho.onlife@gmail.com";
        }

        [HttpPost]
        public async Task<object> SendEmail(EmailDto email)
        {
            var emailClient = new EmailClient(connectionString);

            EmailSendOperation emailSendOperation = await emailClient.SendAsync(
                WaitUntil.Completed,
                senderAddress: "DoNotReply@1e1ee4fc-c0d8-4af6-b0d5-cacef263b0cf.azurecomm.net",
                recipientAddress: $"{email.ToEmail}",
                subject: $"{email.Subject}",
                plainTextContent: $"{email.Message}",
                htmlContent: $"<html><head></head><body><h1>{email.Message}</h1></body></html>"
            );

            if (emailSendOperation.HasCompleted)
            {
                return new OkObjectResult(emailSendOperation.GetRawResponse().Content);
            }
            else
            {
                return new BadRequestObjectResult("Email failed to send");
            }
        }

    }
}
