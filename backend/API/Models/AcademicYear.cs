namespace API.Models{

    public class AcademicYear
    {
        public int Id { get; set; }
        public string Aca_Year { get; set; }
        public string From { get; set; }
        public string To { get; set; } 
        public bool Active { get; set; }

    }
}