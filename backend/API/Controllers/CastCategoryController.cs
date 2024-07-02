using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
        [ApiController]
        [Route("api/[controller]/[action]")]
        public class CastCategoryController : Controller
        {
            private readonly StudentsAPIDbContext dbContext;

            public CastCategoryController(StudentsAPIDbContext dbContext)
            {
                this.dbContext = dbContext;
            }
            [HttpGet]
            public async Task<IActionResult> GetCaste()
            {
               var caste = await dbContext.Category.ToListAsync();
                return Ok(caste);
            }
            [HttpPut]
            public async Task<IActionResult> AddCaste([FromBody] AddcasteRequest requestcaste)
            {
               var categories = dbContext.Category.Where(s => s.Category == requestcaste.Category).ToList();

                foreach (var cat in categories)
                {
                    cat.Caste = requestcaste.Caste;

                }
                await dbContext.SaveChangesAsync();
                return Ok("Updated Successfully");
                
            }

            [HttpDelete]
            public async Task<IActionResult> DeleteCategory(string cat)
            {
                try
                {
                    var catToDelete = await dbContext.Category.FirstOrDefaultAsync(u => u.Category == cat);

                    if (catToDelete == null)
                    {
                        return NotFound("category not found");
                    }

                    dbContext.Category.Remove(catToDelete);
                    await dbContext.SaveChangesAsync();

                    return Ok($"category '{cat}' deleted successfully");
                }
                catch (Exception ex)
                {
                    // Return error message if an exception occurs
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }


        }
}