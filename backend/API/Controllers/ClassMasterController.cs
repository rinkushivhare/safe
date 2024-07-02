
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ClassMasterController : Controller
    {
        private readonly StudentsAPIDbContext dbContext;

        public ClassMasterController(StudentsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllClasses()
        {
            var classMasters = await dbContext.ClassMasters.OrderBy(c => c.Class_Order).ToListAsync();
            var ClassSections = classMasters.Select(s => new AddClassRequest(s));
          
            return Ok(ClassSections);
             
        }
        [HttpPost]
        public async Task<IActionResult> AddNewClass(AddClassRequest addClassRequest)
        {
           string [] classList = {"","NUR","KG1","KG2","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"};
           string selsectedclass = addClassRequest.Class;
           string selsectedSec = addClassRequest.Section;
           int classOrder =0; 
           
           for(int i=1; i<classList.Length;i++)
           {
              if(classList[i].ToString().Equals(selsectedclass))
               classOrder = i;
           }
           var classMaster = new ClassMaster
          {
            Class = selsectedclass,
            Section = selsectedSec,
            Class_Order = classOrder,
         };

        dbContext.ClassMasters.Add(classMaster);

        await dbContext.SaveChangesAsync();

        return Ok(classMaster);

        }
        [HttpPut]
       // [Route("{class:string}")]
         public async Task<IActionResult> EditClass([FromBody] AddClassRequest updateClassRequest)
         {
            var classMaster = dbContext.ClassMasters.Where(s => s.Class == updateClassRequest.Class).ToList();

             foreach (var sect in classMaster)
            {
                sect.Section = updateClassRequest.Section;
            }
            await dbContext.SaveChangesAsync();
            return Ok(classMaster);

         }
    } 
}