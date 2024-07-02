using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class RemoveTableName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
            name: "StudentsDb");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Academic_Year",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Adhaar_No",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Gr_No",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Guardian_Name",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "Religion",
                table: "Students",
                newName: "Parent_Name");

            migrationBuilder.AlterColumn<string>(
                name: "Student_Status",
                table: "Students",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<long>(
                name: "Admission_Year",
                table: "Students",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
