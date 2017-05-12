using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FreedomCalculator2.Migrations
{
    public partial class addBudgetExpenses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BudgetExpense",
                columns: table => new
                {
                    BudgetExpenseId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BudgetId = table.Column<int>(nullable: true),
                    ExpenseId = table.Column<int>(nullable: true),
                    Projected = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetExpense", x => x.BudgetExpenseId);
                    table.ForeignKey(
                        name: "FK_BudgetExpense_Budget_BudgetId",
                        column: x => x.BudgetId,
                        principalTable: "Budget",
                        principalColumn: "BudgetId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BudgetExpense_Expense_ExpenseId",
                        column: x => x.ExpenseId,
                        principalTable: "Expense",
                        principalColumn: "ExpenseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BudgetExpenseItem",
                columns: table => new
                {
                    BudgetExpenseItemId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<decimal>(nullable: false),
                    BudgetExpenseId = table.Column<int>(nullable: true),
                    TimeStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetExpenseItem", x => x.BudgetExpenseItemId);
                    table.ForeignKey(
                        name: "FK_BudgetExpenseItem_BudgetExpense_BudgetExpenseId",
                        column: x => x.BudgetExpenseId,
                        principalTable: "BudgetExpense",
                        principalColumn: "BudgetExpenseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetExpense_BudgetId",
                table: "BudgetExpense",
                column: "BudgetId");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetExpense_ExpenseId",
                table: "BudgetExpense",
                column: "ExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetExpenseItem_BudgetExpenseId",
                table: "BudgetExpenseItem",
                column: "BudgetExpenseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BudgetExpenseItem");

            migrationBuilder.DropTable(
                name: "BudgetExpense");
        }
    }
}
