using FreedomCalculator2.Controllers;
using FreedomCalculator2.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace FreedomCalculator2.Tests
{
    public class BudgetsControllerTests
    {
        [Fact]
        public async Task Post_CreatesBudget()
        {
            // Arrange
            var mockUserStore = new Mock<IUserStore<ApplicationUser>>();
            var userManager = new UserManager<ApplicationUser>(mockUserStore.Object, null, null, null, null, null, null, null, null);
            var mockRepo = new Mock<IFreedomCalculatorRepository>();
            Budget newBudget = new Budget();
            mockRepo.Setup(repo => repo.AddBudget(newBudget)).Returns(Task.FromResult(1));
            ClaimsPrincipal user = new ClaimsPrincipal(new ClaimsIdentity());

            var controller = new BudgetController(userManager, mockRepo.Object);
            controller.ControllerContext = new ControllerContext() { HttpContext = new DefaultHttpContext() { User = user} };

            // Act
            Budget result = await controller.Post(newBudget);

            // Assert
            Assert.Equal(1, result.BudgetId);
        }
    }
}
