using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FreedomCalculator2.Migrations
{
    public partial class assetliabilitylink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LiabilityId",
                table: "Asset",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_LiabilityId",
                table: "Asset",
                column: "LiabilityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_Liability_LiabilityId",
                table: "Asset",
                column: "LiabilityId",
                principalTable: "Liability",
                principalColumn: "LiabilityId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_Liability_LiabilityId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_LiabilityId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "LiabilityId",
                table: "Asset");
        }
    }
}
