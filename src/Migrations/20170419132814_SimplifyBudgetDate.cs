using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FreedomCalculator2.Migrations
{
    public partial class SimplifyBudgetDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Budget");

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "Budget",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Budget",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Month",
                table: "Budget");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Budget");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Budget",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
