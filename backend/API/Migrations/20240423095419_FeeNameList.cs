using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class FeeNameList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeePerticulars",
                columns: table => new
                {
                    Class = table.Column<string>(type: "TEXT", nullable: false),
                    Admission_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Exam_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Comp_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Tution_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Term_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Lab_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Bus_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Library_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Hostel_Fee = table.Column<double>(type: "REAL", nullable: false),
                    E_Learning_Fee = table.Column<double>(type: "REAL", nullable: false),
                    Gratuity_Fund = table.Column<double>(type: "REAL", nullable: false),
                    Library = table.Column<double>(type: "REAL", nullable: false),
                    PTA = table.Column<double>(type: "REAL", nullable: false),
                    Scout_Guide = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeePerticulars", x => x.Class);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserName = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Is_Admin = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeePerticulars");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
