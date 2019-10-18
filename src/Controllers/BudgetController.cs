using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreedomCalculator2.Controllers
{
    [Route("api/budgets")]
    [Authorize]
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

        // POST api/budgets
        [HttpPost]
        public async Task<Budget> Post([FromBody]Budget budget)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            budget.User = user;
            budget.BudgetId = await _repository.AddBudget(budget);
            budget.EarnedIncome = new List<BudgetEarnedIncomeItem>();
            budget.PassiveIncome = new List<BudgetPassiveIncomeItem>();
            budget.Investments = new List<BudgetInvestmentItem>();
            budget.Expenses = new List<BudgetExpense>();
            return budget;
        }

        // DELETE api/budgets/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveBudget(id);
        }

        // PUT api/budgets
        [HttpPut]
        public async Task Put([FromBody]Budget budget)
        {
            await _repository.UpdateBudget(budget.BudgetId, budget);
        }
    }
}
