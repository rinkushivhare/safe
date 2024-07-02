using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AcademicYearController : Controller
    {
            private readonly StudentsAPIDbContext dbContext;

            public AcademicYearController(StudentsAPIDbContext dbContext)
            {
                this.dbContext = dbContext;
            }
            [HttpGet]
            public async Task<IActionResult> GetAllAcademicYear()
            {
                var AcademicYears = await dbContext.Academic_Year.OrderBy(c => c.Id).ToListAsync();
                var AcademicYearsData = AcademicYears.Select(s => new AcademicYearData(s));
            
                return Ok(AcademicYearsData);
                
            }

            [HttpPost]
            public async Task<IActionResult> AddAcademicYear()
            {
                var lastAcademicYear = await dbContext.Academic_Year.OrderByDescending(c => c.Id).FirstOrDefaultAsync();
                if (lastAcademicYear == null)
                {
                    return NotFound(); // Return 404 if no data found
                }
                Console.WriteLine("lastAcademicYear   "+lastAcademicYear.Aca_Year);
                Console.WriteLine($"From: {lastAcademicYear.From}");
                Console.WriteLine($"To: {lastAcademicYear.To}");

                string frmYr = lastAcademicYear.From.Substring(6);
                string toYr = lastAcademicYear.To.Substring(6);
                int fromYear = Convert.ToInt32(toYr);
                int toYear = fromYear+1;

                var academicYear = new AcademicYear
            {
                Aca_Year = fromYear+"-"+toYear.ToString().Substring(2),
                From = lastAcademicYear.From.Substring(0,6)+fromYear,
                To = lastAcademicYear.To.Substring(0,6)+toYear,
                Active = false
            };

                dbContext.Academic_Year.Add(academicYear);

                await dbContext.SaveChangesAsync();

            return Ok(academicYear);
            }
        
            [HttpPost]
            public async Task<IActionResult> SetActiveAcademicYear(string academicYear)
            {
                var year = await dbContext.Academic_Year.FirstOrDefaultAsync(y => y.Aca_Year == academicYear);
                if (year == null)
                {
                    return NotFound($"Academic year '{academicYear}' not found.");
                }

                // Deactivate all other academic years
                var otherYears = await dbContext.Academic_Year.Where(y => y.Aca_Year != academicYear).ToListAsync();
                foreach (var otherYear in otherYears)
                {
                    otherYear.Active = false;
                }

                // Activate the selected academic year
                year.Active = true;

                // Save changes to the database
                await dbContext.SaveChangesAsync();

                return Ok($"Academic year '{academicYear}'  activated successfully.");
            }

        

    }
}