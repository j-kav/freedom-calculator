using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FreedomCalculator2.Controllers
{
    [Route("api/budgetinvestmentitems")]
    [Authorize]
    public class BudgetInvestmentItemController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        IFreedomCalculatorRepository _repository;

        public BudgetInvestmentItemController(UserManager<ApplicationUser> userManager, IFreedomCalculatorRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        // POST api/budgetinvestmentitems
        [HttpPost]
        public async Task<BudgetInvestmentItem> Post([FromBody]BudgetInvestmentItem budgetInvestmentItem)
        {
            budgetInvestmentItem.BudgetInvestmentItemId = await _repository.AddBudgetInvestmentItem(budgetInvestmentItem);
            return budgetInvestmentItem;
        }

        // PUT api/budgetinvestmentitems/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]BudgetInvestmentItem budgetInvestmentItem)
        {
            await _repository.UpdateBudgetInvestmentItem(id, budgetInvestmentItem);
        }

        // DELETE api/budgetinvestmentitems/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.RemoveBudgetInvestmentItem(id);
        }
    }
}
