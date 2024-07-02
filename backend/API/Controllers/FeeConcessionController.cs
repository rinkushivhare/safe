using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FeeConcessionController : ControllerBase
    {
        private readonly StudentsAPIDbContext dbContext;

        public FeeConcessionController( StudentsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
             
           [HttpGet]
            public async Task<IActionResult> PerticularFeeConcession(string admissionNo)
            {
                try
                {
                    var academicyear = dbContext.Academic_Year.FirstOrDefault(y => y.Active);
                    if (academicyear == null)
                        return NotFound("No active academic year found");

                    var activeYear = academicyear.Aca_Year.Replace("-", "");
                    var tableName = "Fee_Concession" + activeYear; // Construct table name based on active academic year
                     string query = $"SELECT * FROM {tableName} WHERE Admission_No ={admissionNo}";
                    var data = await GetDataAsync(query);

                    // Return the data as JSON
                     return Ok(data);
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                    }
            }
            [HttpGet]
            public async Task<IActionResult> LoadPickStudentData()
            {
                try
                {
                    var classList = await dbContext.ClassMasters.Select(c => c.Class).ToListAsync();

                    var academicyear = await dbContext.Academic_Year.FirstOrDefaultAsync(y => y.Active);
                    if (academicyear == null)
                        return NotFound("No active academic year found");

                        var students = await dbContext.Students
                        .Where(s => s.Academic_Year == academicyear.Aca_Year)
                        .Select(s => new 
                        {
                            s.Admission_No,
                            FullName = s.Student_Name + " " + s.Father_Name + " " + s.Last_Name,
                            s.Student_Class,
                            s.Student_Section
                        })
                        .ToListAsync();

                    var responseData = new
                    {
                        ClassList = classList,
                        Students = students
                    };

                return Ok(responseData);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            [HttpGet]
            public async Task<IActionResult> GetSectionByClass(string classname)
            {
                 var sections = await dbContext.ClassMasters.FirstOrDefaultAsync(u => u.Class == classname);
                 return Ok(sections);

            }


            [HttpPut]
            public async Task<IActionResult> EditConcessionFee([FromBody] UpdateConcessionFee updateConcessionFee)
            {
                var academicyear = dbContext.Academic_Year.FirstOrDefault(y => y.Active);
                    if (academicyear == null)
                        return NotFound("No active academic year found");

                    var activeYear = academicyear.Aca_Year.Replace("-", "");
                    var tableName = "Fee_Concession" + activeYear;
                
                    try
                    {
                        
                        var feeNames = dbContext.Fee_Master.Select(f => f.Fee_Name).ToList();
                        string query = $"UPDATE {tableName} SET ";
                        
                        foreach (var fee in updateConcessionFee.Fees)
                        {
                            query += $"[{fee.Fee_Name}] = {fee.Amount}, ";
                        }
                        query = query.TrimEnd(',', ' '); // Remove trailing comma and space
                        query += $" WHERE Admission_No = '{updateConcessionFee.Admission_No}'";
                        Console.WriteLine("query==    "+query);
                        await dbContext.Database.ExecuteSqlRawAsync(query);
                        return Ok("Amounts updated successfully.");
                    } 
                    catch (Exception)
                    {
                        // Log or handle the exception appropriately
                        return StatusCode(500, "An error occurred while updating amounts. Please try again later.");
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