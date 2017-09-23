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
    [Route("api/expenses")]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ExpensesController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public ExpensesController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Expense>> Get()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            List<Expense> expenses = _repository.GetExpenses(Guid.Parse(user.Id));
            return expenses;
        }

        // POST api/expenses
        [HttpPost]
        public async Task<Expense> Post([FromBody]Expense expense)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            expense.User = user;
            expense.ExpenseId = await _repository.AddExpense(expense);
            return expense;
        }

        // PUT api/expenses/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]Expense expense)
        {
            await _repository.UpdateExpense(id, expense);
        }

        // DELETE api/expenses/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveExpense(id);
        }
    }
}
