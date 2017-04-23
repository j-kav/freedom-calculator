using FreedomCalculator2.Controllers;
using FreedomCalculator2.Exceptions;
using FreedomCalculator2.Models;
using System;
using System.Collections.Generic;
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
    public class BudgetEarnedIncomeItemControllerTests
    {
        Mock<IFreedomCalculatorRepository> mockRepo;
        Guid userId;
        BudgetEarnedIncomeItemController controller;

        public BudgetEarnedIncomeItemControllerTests()
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
            controller = new BudgetEarnedIncomeItemController(userManager, mockRepo.Object);
            controller.ControllerContext = new ControllerContext() { HttpContext = new DefaultHttpContext() { User = user } };
        }

        [Fact]
        public async Task Post_CreatesBudgetEarnedIncomeItem()
        {
            // Arrange
            BudgetEarnedIncomeItem newBudgetEarnedIncomeItem = new BudgetEarnedIncomeItem();
            mockRepo.Setup(repo => repo.AddBudgetEarnedIncomeItem(newBudgetEarnedIncomeItem)).Returns(Task.FromResult(1));

            // Act
            BudgetEarnedIncomeItem result = await controller.Post(newBudgetEarnedIncomeItem);

            // Assert
            Assert.Equal(1, result.BudgetEarnedIncomeItemId);
        }
    }
}
