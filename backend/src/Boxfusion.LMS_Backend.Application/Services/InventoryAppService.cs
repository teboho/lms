﻿using Abp.Application.Services;
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

    /// <summary>
    /// Inventory application service class
    /// Inherits from AsyncCrudAppService thus providing CRUD operations
    /// </summary>
    [AbpAuthorize]
    public class InventoryAppService : AsyncCrudAppService<Inventory, InventoryDto, Guid>, IInventoryAppService
    {
        /// <summary>
        /// Constructor for InventoryAppService
        /// </summary>
        /// <param name="repository">Inventory data repository object</param>
        public InventoryAppService(IRepository<Inventory, Guid> repository) : base(repository)
        {
        }
    }
}
