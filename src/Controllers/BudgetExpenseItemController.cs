using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FreedomCalculator2.Controllers
{
    [Route("api/budgetexpenseitems")]
    [Authorize]
    public class BudgetExpenseItemController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public BudgetExpenseItemController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        // POST api/budgetexpenseitems
        [HttpPost]
        public async Task<BudgetExpenseItem> Post([FromBody]BudgetExpenseItem budgetExpenseItem)
        {
            budgetExpenseItem.BudgetExpenseItemId = await _repository.AddBudgetExpenseItem(budgetExpenseItem);
            return budgetExpenseItem;
        }

        // PUT api/budgetexpenseitems/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]BudgetExpenseItem budgetExpenseItem)
        {
            await _repository.UpdateBudgetExpenseItem(id, budgetExpenseItem);
        }

        // DELETE api/budgetexpenseitems/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveBudgetExpenseItem(id);
        }
    }
}
