using FreedomCalculator2.Controllers;
using FreedomCalculator2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
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
            // mock the app's database
            mockRepo = new Mock<IFreedomCalculatorRepository>();

            // mock an asp.net identity user with a principal and claim
            userId = Guid.NewGuid();
            GenericIdentity mockIdentity = new GenericIdentity("mockUser");
            mockIdentity.AddClaim(new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", userId.ToString()));
            ClaimsPrincipal user = new ClaimsPrincipal(mockIdentity);
            ApplicationUser mockUser = new ApplicationUser { Id = userId.ToString() };

            // mock the asp.net identity database and manager
            Mock<IUserStore<ApplicationUser>> mockUserStore = new Mock<IUserStore<ApplicationUser>>();
            mockUserStore.Setup(store => store.FindByIdAsync(userId.ToString(), new CancellationToken())).Returns(Task.FromResult(mockUser));
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(mockUserStore.Object, null, null, null, null, null, null, null, null);

            // inject the mocked repository and usermanager into the controller
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

        [Fact]
        public async Task Get_GetsBudgets()
        {
            // Arrange
            DateTime fakeBudgetDate = DateTime.Now;
            List<Budget> fakeBudgets = new List<Budget> { new Budget { BudgetId = 1, Date = fakeBudgetDate } };
            mockRepo.Setup(repo => repo.GetBudgets(userId)).Returns(fakeBudgets);

            // Act
            IEnumerable<Budget> results = await controller.Get();

            // Assert
            Assert.Equal(fakeBudgets.Count, 1);
            Budget fakeBudget = fakeBudgets[0];
            Assert.Equal(fakeBudget.BudgetId, 1);
            Assert.Equal(fakeBudget.Date, fakeBudgetDate);
        }
    }
}
