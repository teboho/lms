using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Boxfusion.LMS_Backend.Domain;
using Boxfusion.LMS_Backend.Services.Dtos;
using Boxfusion.LMS_Backend.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services
{

    [AbpAuthorize]
    public class PaymentAppService : AsyncCrudAppService<Payment, PaymentDto, Guid>, IPaymentAppService
    {
        public PaymentAppService(IRepository<Payment, Guid> repository) : base(repository)
        { }
    }
}
