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
    [Route("api/expenseaverages")]
    [Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ExpenseAveragesController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public ExpenseAveragesController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<ExpenseAverage>> Get()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            List<ExpenseAverage> expenseAverages = _repository.GetExpenseAverages(Guid.Parse(user.Id));
            return expenseAverages;
        }
    }
}
