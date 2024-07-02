using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddFeeName2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeeNameList",
                columns: table => new
                {
                    Fee_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"), // Auto-increment primary key
                    Fee_Name = table.Column<string>(nullable: true)
                    // Add other columns if needed
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeeNameList", x => x.Fee_Id); // Define primary key constraint
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeeNameList"); 

        }
    }
}
