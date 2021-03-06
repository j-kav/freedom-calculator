using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FreedomCalculator2.Controllers
{
    [Route("api/budgetpassiveincomeitems")]
    [Authorize]
    public class BudgetPassiveIncomeItemController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public BudgetPassiveIncomeItemController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        // POST api/budgetpassiveincomeitems
        [HttpPost]
        public async Task<BudgetPassiveIncomeItem> Post([FromBody]BudgetPassiveIncomeItem budgetPassiveIncomeItem)
        {
            budgetPassiveIncomeItem.BudgetPassiveIncomeItemId = await _repository.AddBudgetPassiveIncomeItem(budgetPassiveIncomeItem);
            return budgetPassiveIncomeItem;
        }

        // PUT api/budgetpassiveincomeitems/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]BudgetPassiveIncomeItem budgetPassiveIncomeItem)
        {
            await _repository.UpdateBudgetPassiveIncomeItem(id, budgetPassiveIncomeItem);
        }

        // DELETE api/budgetpassiveincomeitems/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveBudgetPassiveIncomeItem(id);
        }
    }
}
