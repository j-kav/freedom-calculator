using FreedomCalculator2.Controllers;
using FreedomCalculator2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
        Mock<IFreedomCalculatorRepository> mockRepo;
        Guid userId;
        BudgetController controller;

        public BudgetsControllerTests()
        {
            Mock<IUserStore<ApplicationUser>> mockUserStore = new Mock<IUserStore<ApplicationUser>>();
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(mockUserStore.Object, null, null, null, null, null, null, null, null);
            mockRepo = new Mock<IFreedomCalculatorRepository>();
            ClaimsPrincipal user = new ClaimsPrincipal(new ClaimsIdentity());
            userId = Guid.NewGuid();
            // mockUserStore.Setup(store => store.FindByIdAsync(userId.ToString())).Returns(Task.FromResult(user));
            controller = new BudgetController(userManager, mockRepo.Object);
            controller.ControllerContext = new ControllerContext() { HttpContext = new DefaultHttpContext() { User = user } };
        }

        [Fact]
        public async Task Post_CreatesBudget()
        {
            // Arrange
            Budget newBudget = new Budget();
            mockRepo.Setup(repo => repo.AddBudget(newBudget)).Returns(Task.FromResult(1));

            // Act
            Budget result = await controller.Post(newBudget);

            // Assert
            Assert.Equal(1, result.BudgetId);
        }

        // [Fact]
        // public async Task Get_GetsBudgets()
        // {
        //     // Arrange
        //     List<Budget> fakeBudgets = new List<Budget> { new Budget { BudgetId = 1, Date = DateTime.Now } };
        //     mockRepo.Setup(repo => repo.GetBudgets(userId)).Returns(fakeBudgets);

        //     // Act
        //     IEnumerable<Budget> results = await controller.Get();

        //     // Assert
        //     Assert.Equal(fakeBudgets.Count, results.ToList().Count);
        // }
    }
}
