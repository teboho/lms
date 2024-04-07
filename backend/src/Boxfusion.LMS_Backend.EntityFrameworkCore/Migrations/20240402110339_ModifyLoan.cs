using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.LMS_Backend.Migrations
{
    /// <inheritdoc />
    public partial class ModifyLoan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateDue",
                table: "Loans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateReturned",
                table: "Loans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOverdue",
                table: "Loans",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsReturned",
                table: "Loans",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateDue",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "DateReturned",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "IsOverdue",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "IsReturned",
                table: "Loans");
        }
    }
}
