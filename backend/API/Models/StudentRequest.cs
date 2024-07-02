namespace API.Models
{
    public class StudentRequest
    {
        public	long    Admission_No	{ get; set; }
        public	string?    Academic_Year	{ get; set; }
        public	DateTime Admission_Date	{ get; set; }
        public	string?	Student_Name	{ get; set; }
        public	string?	Student_Class	{ get; set; }
        public	string?	Student_Section	{ get; set; }
        public	DateTime  Dob	{ get; set; }
        public	string?	Gender	{ get; set; }
        public	string?	Gr_No	{ get; set; }
        
        public string? SortBy { get; set; }

    }
}