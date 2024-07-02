

using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class StudentData
    {
        
        public Guid Student_Id  { get; set; }
        public	long    Admission_No	{ get; set; }
        public	string    Academic_Year	{ get; set; }
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
        public	byte[]	Photo 	{ get; set; }
        public	string	Category	{ get; set; }
        public	string	Cast	{ get; set; }
        public	string?	Mother_Name	{ get; set; }
        public	string?	Father_Name	{ get; set; }
        public	string	Last_Name	{ get; set; }
        public	string	Gr_No	{ get; set; }
        public	string	Adhaar_No	{ get; set; }
        public	string	Religion	{ get; set; }


        public StudentData()
        {
        }


        public StudentData(Student student)
        {
            Student_Id = student.Student_Id;
            Admission_No = student.Admission_No;
            Academic_Year = student.Academic_Year;
            Admission_Date = student.Admission_Date;
            Student_Name = student.Student_Name;
            Student_Class = student.Student_Class;
            Student_Section = student.Student_Section;
            Dob = student.Dob;
            Gender = student.Gender;
            Guardian_Name = student.Guardian_Name;
            Address = student.Address;
            City = student.City;
            State = student.State;
            Phone = student.Phone;
            Email = student.Email;
            Photo = student.Photo;
            Category = student.Category;
            Cast = student.Cast;
            Mother_Name = student.Mother_Name;
            Father_Name = student.Father_Name;
            Last_Name = student.Last_Name;
            Gr_No = student.Gr_No;
            Adhaar_No = student.Adhaar_No;
            Religion = student.Religion;

        }
    }
}