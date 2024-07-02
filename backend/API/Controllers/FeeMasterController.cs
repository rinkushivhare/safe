
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FeeMasterController : Controller
    {
        private readonly StudentsAPIDbContext dbContext;

        public FeeMasterController(StudentsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetFeesStructure()
        {
            var feeMasters = await dbContext.Fee_Master.OrderBy(c => c.Fee_Id).ToListAsync();
            var feeStructure = feeMasters.Select(s => new AddFeesRequest(s));
          
            return Ok(feeStructure);
             
        }
        [HttpPost]
        public async Task<IActionResult> AddNewFees(AddFeesRequest addFeesRequest)
        {
           //string feeName = addFeesRequest.Fee_Name; 
           //string applyFor = addFeesRequest.Apply_For; 
           //DateTime dueDate = addFeesRequest.Due_Dates;
           //bool each_Year = true;

           //if(feeName.Equals("Admission Fee"))
            // each_Year=false;
           var academicyear = dbContext.Academic_Year.FirstOrDefault(y => y.Active);
            if (academicyear == null)
                return NotFound("No active academic year found");

            var activeYear = academicyear.Aca_Year.Replace("-", "");
            var tableName = "Fee_Concession" + activeYear;
           
           var feeMaster = new FeeMaster
          {
            Fee_Name = addFeesRequest.Fee_Name,
            Apply_For = addFeesRequest.Apply_For,
            Due_Dates = addFeesRequest.Due_Dates,
            Each_Year = addFeesRequest.Each_Year,
            Is_Compulsary= addFeesRequest.Is_Compulsary,
         };

        dbContext.Fee_Master.Add(feeMaster);


        string sqlScript = $"ALTER TABLE {tableName} ADD {addFeesRequest.Fee_Name.Replace(" ","_")} DOUBLE NOT NULL DEFAULT 0.0";
        dbContext.Database.ExecuteSqlRaw(sqlScript);

        await dbContext.SaveChangesAsync();

        return Ok(feeMaster);

        }
        [HttpPost]
        public async Task<IActionResult> AddFeename(FeeNameList addFeesRequest)
        {
            var feeNameList = new FeeNameList
         {
            Fee_Name = addFeesRequest.Fee_Name,
            
         };

        dbContext.FeeNameList.Add(feeNameList);

        await dbContext.SaveChangesAsync();

        return Ok(feeNameList);
        }

        [HttpPut]
       // [Route("{class:string}")]
         public async Task<IActionResult> EditFees([FromBody] AddFeesRequest updateFeesRequest)
         {
            var feeMaster = dbContext.Fee_Master.Where(s => s.Fee_Name == updateFeesRequest.Fee_Name).ToList();

             foreach (var fee in feeMaster)
            {
                fee.Apply_For = updateFeesRequest.Apply_For;
                fee.Due_Dates = updateFeesRequest.Due_Dates;
                fee.Each_Year = updateFeesRequest.Each_Year;
                fee.Is_Compulsary = updateFeesRequest.Is_Compulsary;
            }
            await dbContext.SaveChangesAsync();
            return Ok(feeMaster);

         }

    } 
}