using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FreedomCalculator2.Controllers
{
    [Route("api/budgetexpenses")]
    [Authorize]
    public class BudgetExpenseController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public BudgetExpenseController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        // POST api/budgetexpenses
        [HttpPost]
        public async Task<BudgetExpense> Post([FromBody]BudgetExpense budgetExpense)
        {
            budgetExpense.BudgetExpenseId = await _repository.AddBudgetExpense(budgetExpense);
            return budgetExpense;
        }

        // PUT api/budgetexpenses/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]BudgetExpense budgetExpense)
        {
            await _repository.UpdateBudgetExpense(id, budgetExpense);
        }

        // DELETE api/budgetexpenses/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveBudgetExpense(id);
        }
    }
}
