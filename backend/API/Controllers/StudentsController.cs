
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
     public class StudentsController : Controller
    {
        private readonly StudentsAPIDbContext dbContext;

        public StudentsController(StudentsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await dbContext.Students.ToListAsync();
            var studentDtos = students.Select(s => new StudentData(s));
          //  {
                // Exclude student_Status property
                //Student_Status = null
            //});
            return Ok(studentDtos);
             
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetStudentByID([FromRoute] Guid id)
        {
            var student = await dbContext.Students.FindAsync(id);
            if(student == null)
            {
                return NotFound();
            }

            var studentData = new StudentData(student);

            return Ok(studentData);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Student>>> SearchUsingFields([FromQuery] StudentRequest request)
        {
            var query = dbContext.Students.AsQueryable();

            if (!string.IsNullOrEmpty(request.Academic_Year))
            {
                query = query.Where(s => s.Academic_Year == request.Academic_Year);
            }
            if (!string.IsNullOrEmpty(request.Gr_No))
            {
                query = query.Where(s => s.Gr_No == request.Gr_No);
            }

            if (!string.IsNullOrEmpty(request.Student_Name))
            {
                query = query.Where(s => s.Student_Name == request.Student_Name);
            }

            if (request.Admission_No != 0)
            {
                query = query.Where(s => s.Admission_No == request.Admission_No);
            }

            if (request.Admission_Date != default)
            {
                query = query.Where(s => s.Admission_Date == request.Admission_Date);
            }

            if (request.Dob != default)
            {
                query = query.Where(s => s.Dob == request.Dob);
            }

            if (!string.IsNullOrEmpty(request.Gender)&& !request.Gender.Equals("All"))
            {
                query = query.Where(s => s.Gender == request.Gender);
            }

            if (!string.IsNullOrEmpty(request.Student_Class)&& !request.Student_Class.Equals("All"))
            {
                query = query.Where(s => s.Student_Class == request.Student_Class);
            }

            if (!string.IsNullOrEmpty(request.Student_Section)&& !request.Student_Section.Equals("All"))
            {
                query = query.Where(s => s.Student_Section == request.Student_Section);
            }


            var students = await query.ToListAsync();
            return Ok(students);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> PickStudent ([FromQuery] StudentRequest request)
        {
            var query = dbContext.Students.AsQueryable();
            if (!string.IsNullOrEmpty(request.Student_Class)&& !request.Student_Class.Equals("All"))
            {
                query = query.Where(s => s.Student_Class == request.Student_Class);
            }

            if (!string.IsNullOrEmpty(request.Student_Section)&& !request.Student_Section.Equals("All"))
            {
                query = query.Where(s => s.Student_Section == request.Student_Section);
            }
            if (!string.IsNullOrEmpty(request.Student_Name))
            {
                query = query.Where(s => s.Student_Name == request.Student_Name);
            }

            // if (request.Admission_No != 0)
            // {
            //     query = query.Where(s => s.Admission_No == request.Admission_No);
            // }
            query = request.SortBy switch
            {
                "Admission_No" => query.OrderBy(s => s.Admission_No),
                "Student_Name" => query.OrderBy(s => s.Student_Name),
                _ => query.OrderBy(s => s.Admission_No),// Default sorting if no valid sorting criterion is provided
            };
            var students = await query.ToListAsync();
            return Ok(students);

        }

        [HttpPost]
        public async Task<IActionResult> GetNewAdmission(AddStudentRequest addStudentRequest)
        {
              var existingStudent = dbContext.Students.FirstOrDefault(u => u.Student_Name == addStudentRequest.Student_Name && u.Father_Name == addStudentRequest.Father_Name && u.Last_Name == addStudentRequest.Last_Name && u.Student_Class == addStudentRequest.Student_Class && u.Student_Section == addStudentRequest.Student_Section && u.Dob == addStudentRequest.Dob);
                if(existingStudent != null)
                {
                     return Ok(existingStudent.Student_Name+" Is Already Exists..Enter Next Student Details");
                }
            //Console.WriteLine("addStudentRequest.Photo   "+addStudentRequest.Photo);
           byte[] photoData = Convert.FromBase64String(addStudentRequest.Photo.Replace("data:image/webp;base64,",""));
           var student  = new Student()
           {
                Student_Id = Guid.NewGuid(),
                Admission_No = addStudentRequest.Admission_No,
                Academic_Year = addStudentRequest.Academic_Year,
                Admission_Date = addStudentRequest.Admission_Date,
                Student_Name = addStudentRequest.Student_Name,
                Student_Class = addStudentRequest.Student_Class,
                Student_Section = addStudentRequest.Student_Section,
                Dob = addStudentRequest.Dob,
                Gender = addStudentRequest.Gender,
                Guardian_Name = addStudentRequest.Guardian_Name,
                Address = addStudentRequest.Address,
                City = addStudentRequest.City,
                State = addStudentRequest.State,
                Phone = addStudentRequest.Phone,
                Email = addStudentRequest.Email,
                Photo = photoData, 
                Category = addStudentRequest.Category,
                Cast = addStudentRequest.Cast,
                Mother_Name = addStudentRequest.Mother_Name,
                Father_Name = addStudentRequest.Father_Name,
                Last_Name = addStudentRequest.Last_Name,
                Gr_No = addStudentRequest.Gr_No,
                Adhaar_No = addStudentRequest.Adhaar_No,
                Religion = addStudentRequest.Religion,


           };
           var admission  = new Admissions()
           {
                Admission_No = addStudentRequest.Admission_No,
                Academic_Year = addStudentRequest.Academic_Year,
                Admission_Date = addStudentRequest.Admission_Date,
                Student_Name = addStudentRequest.Student_Name,
                Student_Class = addStudentRequest.Student_Class,
                Student_Section = addStudentRequest.Student_Section,
           };
           
           await dbContext.Admission.AddAsync(admission);
           await dbContext.Students.AddAsync(student);
           await dbContext.SaveChangesAsync();

           

           return Ok("Student Registered Sucessfully");
             
        }

        [HttpPut]
        [Route("{id:guid}")]
         public async Task<IActionResult> EditStudentDetails([FromRoute] Guid id, UpdateStudentRequest updateStudentRequest)
         {
           var   student = await dbContext.Students.FindAsync(id);
           if(student != null)
           {
                student.Admission_No = updateStudentRequest.Admission_No;
                student.Academic_Year = updateStudentRequest.Academic_Year;
                student.Admission_Date = updateStudentRequest.Admission_Date;
                student.Student_Name = updateStudentRequest.Student_Name;
                student.Student_Class = updateStudentRequest.Student_Class;
                student.Student_Section = updateStudentRequest.Student_Section;
                student.Dob = updateStudentRequest.Dob;
                student.Gender = updateStudentRequest.Gender;
                student.Guardian_Name = updateStudentRequest.Guardian_Name;
                student.Address = updateStudentRequest.Address;
                student.City = updateStudentRequest.City;
                student.State = updateStudentRequest.State;
                student.Phone = updateStudentRequest.Phone;
                student.Email = updateStudentRequest.Email;
                student.Photo = updateStudentRequest.Photo;
                student.Category = updateStudentRequest.Category;
                student.Cast = updateStudentRequest.Cast;
                student.Mother_Name = updateStudentRequest.Mother_Name;
                student.Father_Name = updateStudentRequest.Father_Name;
                student.Last_Name = updateStudentRequest.Last_Name;
                student.Gr_No = updateStudentRequest.Gr_No;
                student.Adhaar_No = updateStudentRequest.Adhaar_No;
                student.Religion =updateStudentRequest.Religion;
                await dbContext.SaveChangesAsync();
                return Ok(student);


           }
            return NotFound();

         }

         [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteStudentByID([FromRoute] Guid id)
        {
           var   student = await dbContext.Students.FindAsync(id);
           if(student != null)
           {
               dbContext.Remove(student);
               await dbContext.SaveChangesAsync();
               return Ok(student);
           }
           return NotFound();
        }

    }
}