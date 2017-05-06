using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FreedomCalculator2.Migrations
{
    public partial class addBudgetPassiveIncome : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "TimeStamp",
                table: "BudgetEarnedIncomeItem",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "BudgetPassiveIncomeItem",
                columns: table => new
                {
                    BudgetPassiveIncomeItemId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<decimal>(nullable: false),
                    BudgetId = table.Column<int>(nullable: false),
                    TimeStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetPassiveIncomeItem", x => x.BudgetPassiveIncomeItemId);
                    table.ForeignKey(
                        name: "FK_BudgetPassiveIncomeItem_Budget_BudgetId",
                        column: x => x.BudgetId,
                        principalTable: "Budget",
                        principalColumn: "BudgetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetPassiveIncomeItem_BudgetId",
                table: "BudgetPassiveIncomeItem",
                column: "BudgetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BudgetPassiveIncomeItem");

            migrationBuilder.DropColumn(
                name: "TimeStamp",
                table: "BudgetEarnedIncomeItem");
        }
    }
}
