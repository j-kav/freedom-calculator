using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FreedomCalculator2.Migrations
{
    public partial class fixBudgetExpenseLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BudgetExpenseItem_BudgetExpense_BudgetExpenseId",
                table: "BudgetExpenseItem");

            migrationBuilder.DropColumn(
                name: "BugetExpenseId",
                table: "BudgetExpenseItem");

            migrationBuilder.AlterColumn<int>(
                name: "BudgetExpenseId",
                table: "BudgetExpenseItem",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetExpenseItem_BudgetExpense_BudgetExpenseId",
                table: "BudgetExpenseItem",
                column: "BudgetExpenseId",
                principalTable: "BudgetExpense",
                principalColumn: "BudgetExpenseId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BudgetExpenseItem_BudgetExpense_BudgetExpenseId",
                table: "BudgetExpenseItem");

            migrationBuilder.AlterColumn<int>(
                name: "BudgetExpenseId",
                table: "BudgetExpenseItem",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "BugetExpenseId",
                table: "BudgetExpenseItem",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetExpenseItem_BudgetExpense_BudgetExpenseId",
                table: "BudgetExpenseItem",
                column: "BudgetExpenseId",
                principalTable: "BudgetExpense",
                principalColumn: "BudgetExpenseId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
