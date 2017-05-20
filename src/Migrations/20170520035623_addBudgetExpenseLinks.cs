using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FreedomCalculator2.Migrations
{
    public partial class addBudgetExpenseLinks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BudgetExpense_Budget_BudgetId",
                table: "BudgetExpense");

            migrationBuilder.DropForeignKey(
                name: "FK_BudgetExpense_Expense_ExpenseId",
                table: "BudgetExpense");

            migrationBuilder.AddColumn<int>(
                name: "BugetExpenseId",
                table: "BudgetExpenseItem",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ExpenseId",
                table: "BudgetExpense",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "BudgetExpense",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetExpense_Budget_BudgetId",
                table: "BudgetExpense",
                column: "BudgetId",
                principalTable: "Budget",
                principalColumn: "BudgetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetExpense_Expense_ExpenseId",
                table: "BudgetExpense",
                column: "ExpenseId",
                principalTable: "Expense",
                principalColumn: "ExpenseId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BudgetExpense_Budget_BudgetId",
                table: "BudgetExpense");

            migrationBuilder.DropForeignKey(
                name: "FK_BudgetExpense_Expense_ExpenseId",
                table: "BudgetExpense");

            migrationBuilder.DropColumn(
                name: "BugetExpenseId",
                table: "BudgetExpenseItem");

            migrationBuilder.AlterColumn<int>(
                name: "ExpenseId",
                table: "BudgetExpense",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "BudgetExpense",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetExpense_Budget_BudgetId",
                table: "BudgetExpense",
                column: "BudgetId",
                principalTable: "Budget",
                principalColumn: "BudgetId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetExpense_Expense_ExpenseId",
                table: "BudgetExpense",
                column: "ExpenseId",
                principalTable: "Expense",
                principalColumn: "ExpenseId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
