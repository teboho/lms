using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Boxfusion.LMS_Backend.Domain;
using Boxfusion.LMS_Backend.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Services
{

    [AbpAuthorize]
    public class PreferenceAppService : AsyncCrudAppService<Preference, PreferenceDto, Guid>
    {
        private IRepository<Preference, Guid> _repository;
        public PreferenceAppService(IRepository<Preference, Guid> repository) : base(repository)
        { 
            _repository = repository;
        }

        // Override the Create method to add a new preference by first checking if the patron already has a preference
        public override async Task<PreferenceDto> CreateAsync(PreferenceDto input)
        {
            var preference = await _repository.FirstOrDefaultAsync(x => x.PatronId == input.PatronId);
            if (preference != null)
            {
                preference.PrimaryCategoryId = input.PrimaryCategoryId;
                preference.SecondaryCategoryId = input.SecondaryCategoryId;
                preference.TertiaryCategoryId = input.TertiaryCategoryId;
                await _repository.UpdateAsync(preference);
                return ObjectMapper.Map<PreferenceDto>(preference);
            }
            else
            {
                return await base.CreateAsync(input);
            }
        }

        // get preference by patron id
        public PreferenceDto GetByPatronId(long patronId)
        {
            var preference = _repository.FirstOrDefault(x => x.PatronId == patronId);
            return MapToEntityDto(preference);
        }
    }
}
