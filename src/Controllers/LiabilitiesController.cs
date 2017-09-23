using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AspNet.Security.OAuth.Validation;
using FreedomCalculator2.Models;

namespace FreedomCalculator2.Controllers
{
    [Route("api/liabilities")]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class LiabilitiesController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public LiabilitiesController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Liability>> Get()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            List<Liability> liabilities = _repository.GetLiabilities(Guid.Parse(user.Id));
            return liabilities;
        }

        // POST api/liabilities
        [HttpPost]
        public async Task<Liability> Post([FromBody]Liability liability)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            liability.User = user;
            liability.LiabilityId = await _repository.AddLiability(liability);
            return liability;
        }

        // PUT api/liabilities/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]Liability liability)
        {
            await _repository.UpdateLiability(id, liability);
        }

        // DELETE api/liabilities/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveLiability(id);
        }
    }
}
