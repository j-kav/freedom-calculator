using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreedomCalculator2.Controllers
{
    [Route("api/expenseaverages")]
    [Authorize]
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
