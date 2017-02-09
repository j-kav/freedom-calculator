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
    [Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class LiabilitiesController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public LiabilitiesController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        [Route("api/liabilities"), HttpGet]
        public async Task<IEnumerable<Liability>> Get()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            List<Liability> liabilities = _repository.GetLiabilities(Guid.Parse(user.Id));
            return liabilities;
        }
    }
}
