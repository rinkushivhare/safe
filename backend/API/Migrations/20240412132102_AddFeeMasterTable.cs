using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddFeeMasterTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fee_Master",
                columns: table => new
                {
                    Fee_Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Fee_Name = table.Column<string>(type: "TEXT", nullable: false),
                    Is_Compulsary = table.Column<bool>(type: "INTEGER", nullable: false),
                    Apply_For = table.Column<string>(type: "TEXT", nullable: false),
                    Installment = table.Column<int>(type: "INTEGER", nullable: false),
                    Due_Dates = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Each_Year = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fee_Master", x => x.Fee_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fee_Master");
        }
    }
}
