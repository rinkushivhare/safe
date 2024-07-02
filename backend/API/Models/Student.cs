

using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class Student
    {
        [Key]
        public Guid Student_Id  { get; set; }
        public	long  Admission_No	{ get; set; }
        public	string  Academic_Year	{ get; set; }
        public	DateTime Admission_Date	{ get; set; }
        public	string	Student_Name	{ get; set; }
        public	string	Student_Class	{ get; set; }
        public	string	Student_Section	{ get; set; }
        public	DateTime  Dob	{ get; set; }
        public	string	Gender	{ get; set; }
        public	string?	Guardian_Name	{ get; set; }
        public	string	Address	{ get; set; }
        public	string	City	{ get; set; }
        public	string	State	{ get; set; }
        public	long	Phone	{ get; set; }
        public	string?	Email	{ get; set; }
        public	byte[]?	Photo 	{ get; set; }
        public	string	Category	{ get; set; }
        public	string	Cast	{ get; set; }
        public	string?	Mother_Name	{ get; set; }
        public	string?	Father_Name	{ get; set; }
        public	string	Last_Name	{ get; set; }
        public	string	Gr_No	{ get; set; }
        public	string	Adhaar_No	{ get; set; }
        public	string	Religion	{ get; set; }

        public bool Student_Status { get; set; } = false; // Set default value to false

        
    }
}