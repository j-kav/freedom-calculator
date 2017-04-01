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
    [Route("api/budgets")]
    [Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class BudgetController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public BudgetController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Budget>> Get()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            List<Budget> budgets = _repository.GetBudgets(Guid.Parse(user.Id));
            return budgets;
        }

        // POST api/expenses
        [HttpPost]
        public async Task<Budget> Post([FromBody]Budget budget)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            budget.User = user;
            budget.BudgetId = await _repository.AddBudget(budget);
            return budget;
        }

        // PUT api/expenses/5
        // [HttpPut("{id}")]
        // public async Task Put(int id, [FromBody]Budget budget)
        // {
        //     await _repository.UpdateBudget(id, budget);
        // }

        // // DELETE api/expenses/5
        // [HttpDelete("{id}")]
        // public async Task Delete(int id)
        // {
        //     await _repository.RemoveBudget(id);
        // }
    }
}
