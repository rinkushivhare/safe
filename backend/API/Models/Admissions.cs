

using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class Admissions
    {
        [Key]
        public	long  Admission_No	{ get; set; }
        public	string  Academic_Year	{ get; set; }
        public	DateTime Admission_Date	{ get; set; }
        public	string	Student_Name	{ get; set; }
        public	string	Student_Class	{ get; set; }
        public	string	Student_Section	{ get; set; }
        public string Student_Id  { get; set; }

        
    }
}