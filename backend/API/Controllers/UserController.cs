using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Controllers
{
        [ApiController]
        [Route("api/[controller]/[action]")]
        public class UserController : Controller
        {
            private readonly StudentsAPIDbContext dbContext;

            public UserController(StudentsAPIDbContext dbContext)
            {
                this.dbContext = dbContext;
            }

            [HttpGet]
            public async Task<IActionResult> GetUsers()
            {
                var users = await dbContext.Users.ToListAsync();
                return Ok(users);
            }
            [HttpPost]
            public async Task<IActionResult> AddNewUser(User userRequest)
            {
                var existingUser = dbContext.Users.FirstOrDefault(u => u.UserName == userRequest.UserName);
                if(existingUser != null)
                {
                     return Ok(userRequest.UserName+" is a already exist");
                }
                var user1 = new User
                {
                    UserName = userRequest.UserName,
                    Password = userRequest.Password,
                    Is_Admin = userRequest.Is_Admin
                };

            dbContext.Users.Add(user1);

            await dbContext.SaveChangesAsync();

            return Ok("User Added Successfully");
            }
            [HttpPut]
            public async Task<IActionResult> EditUser([FromBody] User editUserRequest)
            {
                var userlist = dbContext.Users.Where(s => s.UserName == editUserRequest.UserName).ToList();

                foreach (var u in userlist)
                {
                    u.UserName = editUserRequest.UserName;
                    u.Password = editUserRequest.Password;
                    u.Is_Admin = editUserRequest.Is_Admin;

                }
                await dbContext.SaveChangesAsync();
                return Ok("Updated Successfully");

            }
            [HttpDelete]
            public async Task<IActionResult> DeleteUserByUsername(string username)
            {
                try
                {
                    // Find the user with the specified username
                    var userToDelete = await dbContext.Users.FirstOrDefaultAsync(u => u.UserName == username);

                    if (userToDelete == null)
                    {
                        // User with the specified username not found
                        return NotFound($"User with username '{username}' not found");
                    }

                    // Remove the user from the database
                    dbContext.Users.Remove(userToDelete);
                    await dbContext.SaveChangesAsync();

                    // Return success message
                    return Ok($"User '{username}' deleted successfully");
                }
                catch (Exception ex)
                {
                    // Return error message if an exception occurs
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }
            
        }
}
