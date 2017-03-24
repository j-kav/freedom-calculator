using FreedomCalculator2.Controllers;
using FreedomCalculator2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace FreedomCalculator2.Tests
{
    public class BudgetsControllerTests
    {
    //     [Fact]
    //     public async Task Post_CreatesBudget()
    //     {
    //         // Arrange
    //         var mockRepo = new Mock<IFreedomCalculatorRepository>();
    //         mockRepo.Setup(repo => repo.ListAsync()).Returns(Task.FromResult(GetTestSessions()));
    //         var controller = new HomeController(mockRepo.Object);

    //         // Act
    //         var result = await controller.Index();

    //         // Assert
    //         var viewResult = Assert.IsType<ViewResult>(result);
    //         var model = Assert.IsAssignableFrom<IEnumerable<StormSessionViewModel>>(
    //             viewResult.ViewData.Model);
    //         Assert.Equal(2, model.Count());
    //     }
    //     }

    //     private List<BrainstormSession> GetTestSessions()
    //     {
    //         var sessions = new List<BrainstormSession>();
    //         sessions.Add(new BrainstormSession()
    //         {
    //             DateCreated = new DateTime(2016, 7, 2),
    //             Id = 1,
    //             Name = "Test One"
    //         });
    //         sessions.Add(new BrainstormSession()
    //         {
    //             DateCreated = new DateTime(2016, 7, 1),
    //             Id = 2,
    //             Name = "Test Two"
    //         });
    //         return sessions;
    //     }
    // }
}
