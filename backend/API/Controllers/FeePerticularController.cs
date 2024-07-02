using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FeePerticularController : Controller
    {
        private readonly StudentsAPIDbContext dbContext;

            public FeePerticularController(StudentsAPIDbContext dbContext)
            {
                this.dbContext = dbContext;
            }
           [HttpGet]
            public async Task<IActionResult> LoadFeePerticular()
            {
                try
                {
                    var academicyear = dbContext.Academic_Year.FirstOrDefault(y => y.Active);
                    if (academicyear == null)
                        return NotFound("No active academic year found");

                    var activeYear = academicyear.Aca_Year.Replace("-", "");
                    var tableName = "Fee_Perticular" + activeYear; // Construct table name based on active academic year

                    string query = $"SELECT * FROM {tableName}";

                    var data = await GetDataAsync(query);
                    return Ok(data);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }

            }
            
            [HttpPut]
            public async Task<IActionResult> EditPerticularFee([FromBody] UpdatePerticularFee updatePerticularFee)
            {

                var academicyear = dbContext.Academic_Year.FirstOrDefault(y => y.Active);
                    if (academicyear == null)
                        return NotFound("No active academic year found");

                    var activeYear = academicyear.Aca_Year.Replace("-", "");
                    var tableName = "Fee_Perticular" + activeYear;
                if (updatePerticularFee == null || string.IsNullOrEmpty(updatePerticularFee.Fee_Name) || updatePerticularFee.Classes == null || !updatePerticularFee.Classes.Any() || updatePerticularFee.Amount <= 0)
                {
                    return BadRequest("Invalid request. Please provide valid column name, amount, and classes.");
                }

                 try
                {
                    var classList = updatePerticularFee.Classes;
                    var sql = $"UPDATE {tableName} SET [{updatePerticularFee.Fee_Name}] = {updatePerticularFee.Amount} WHERE [Class] IN ({string.Join(",", classList)})";
                    //Console.WriteLine("sql:::  "+sql);
                    await dbContext.Database.ExecuteSqlRawAsync(sql);

                    return Ok("Amounts updated successfully.");
                }
                catch (Exception)
                {
                    // Log or handle the exception appropriately
                    return StatusCode(500, "An error occurred while updating amounts. Please try again later.");
                }
            }
            [HttpPost]
            public async Task<IActionResult> ReconfigureFee()
            {
                var classes = dbContext.ClassMasters.Select(s => s.Class).ToList();
                var feeNames = dbContext.Fee_Master.Select(s => s.Fee_Name.Replace(" & ", "_").Replace(" ", "_").Replace("-", "_")).ToList();
                var academicYear = dbContext.Academic_Year.FirstOrDefault(y => y.Active);
                if (academicYear == null)
                    return NotFound("No active academic year found");

                var activeYear = academicYear.Aca_Year.Replace("-", "");
                var tableName = "Fee_Perticular" + activeYear;

                try
                {
                    var sql = $"DROP TABLE IF EXISTS [{tableName}]";
                    await dbContext.Database.ExecuteSqlRawAsync(sql);
                   

                    string sqlScript = $@"
                    CREATE TABLE IF NOT EXISTS {tableName} (
                        Class VARCHAR(50) NOT NULL,
                        {string.Join(", ", feeNames.Select(feeName => $"{feeName} DOUBLE NOT NULL DEFAULT 0.0"))},
                        PRIMARY KEY (Class)
                        );
                    ";

                    Console.WriteLine($"SQL Script: {sqlScript}"); // Print the SQL script to verify

                    // Execute the SQL script to create the table
                    dbContext.Database.ExecuteSqlRaw(sqlScript);

                     foreach (var className in classes)
                    {
                        Console.WriteLine($"className: {className}"); // Print the SQL script to verify

                        // Generate SQL INSERT statement for each class
                        string insertStatement = $@"
                            INSERT INTO Fee_Perticular{activeYear} (Class) 
                            VALUES ('{className.Replace("'", "''")}') 
                            ON CONFLICT(Class) DO NOTHING"; // Prevent duplicates

                        // Execute SQL INSERT statement
                        Console.WriteLine($"SQL Script: {insertStatement}"); // Print the SQL script to verify

                        dbContext.Database.ExecuteSqlRaw(insertStatement);
                    }

                    return Ok($"Table '{tableName}' Created successfully.");
                }
                catch (Exception ex)
                {
                    // Log the exception or handle it appropriately
                    return StatusCode(500, $"An error occurred: {ex.Message}");
                }
            }

             private async Task<List<Dictionary<string, object>>> GetDataAsync(string query)
            {
                var data = new List<Dictionary<string, object>>();

                using (var command = dbContext.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = query;
                    command.CommandType = System.Data.CommandType.Text;

                    await dbContext.Database.OpenConnectionAsync();

                    using (var result = await command.ExecuteReaderAsync())
                    {
                        while (await result.ReadAsync())
                        {
                            var row = new Dictionary<string, object>();

                            for (int i = 0; i < result.FieldCount; i++)
                            {
                                row[result.GetName(i)] = await result.GetFieldValueAsync<object>(i);
                            }

                            data.Add(row);
                        }
                    }
                }

                return data;
    }
    }
}