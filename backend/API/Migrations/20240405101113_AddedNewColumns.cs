using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddedNewColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudentsData",
                columns: table => new
                {
                    Student_Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Admission_No = table.Column<long>(type: "INTEGER", nullable: false),
                    Academic_Year = table.Column<string>(type: "TEXT", nullable: false),
                    Admission_Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Student_Name = table.Column<string>(type: "TEXT", nullable: false),
                    Student_Class = table.Column<string>(type: "TEXT", nullable: false),
                    Student_Section = table.Column<string>(type: "TEXT", nullable: false),
                    Dob = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", nullable: false),
                    Guardian_Name = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    State = table.Column<string>(type: "TEXT", nullable: false),
                    Phone = table.Column<long>(type: "INTEGER", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Photo = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    Cast = table.Column<string>(type: "TEXT", nullable: false),
                    Mother_Name = table.Column<string>(type: "TEXT", nullable: false),
                    Father_Name = table.Column<string>(type: "TEXT", nullable: false),
                    Last_Name = table.Column<string>(type: "TEXT", nullable: false),
                    Gr_No = table.Column<string>(type: "TEXT", nullable: false),
                    Adhaar_No = table.Column<string>(type: "TEXT", nullable: false),
                    Religion = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsData", x => x.Student_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentsData");
        }
    }
}
