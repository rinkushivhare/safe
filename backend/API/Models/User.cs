using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class User
    {
        [Key]
         public int User_Id{ get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Is_Admin { get; set; }
    }
}