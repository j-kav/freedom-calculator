using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FreedomCalculator2.Controllers
{
    [Route("api/budgetearnedincomeitems")]
    [Authorize]
    public class BudgetEarnedIncomeItemController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public BudgetEarnedIncomeItemController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        // POST api/budgetearnedincomeitems
        [HttpPost]
        public async Task<BudgetEarnedIncomeItem> Post([FromBody]BudgetEarnedIncomeItem budgetEarnedIncomeItem)
        {
            budgetEarnedIncomeItem.BudgetEarnedIncomeItemId = await _repository.AddBudgetEarnedIncomeItem(budgetEarnedIncomeItem);
            return budgetEarnedIncomeItem;
        }

        // PUT api/budgetearnedincomeitems/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]BudgetEarnedIncomeItem budgetEarnedIncomeItem)
        {
            await _repository.UpdateBudgetEarnedIncomeItem(id, budgetEarnedIncomeItem);
        }

        // DELETE api/budgetearnedincomeitems/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveBudgetEarnedIncomeItem(id);
        }
    }
}
