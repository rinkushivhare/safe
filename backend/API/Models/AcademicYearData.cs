namespace API.Models{

    public class AcademicYearData
    {
        public string Aca_Year { get; set; }
        public string From { get; set; }
        public string To { get; set; } 
        public bool Active { get; set; }
        public AcademicYearData()
        {
            
        }
        public AcademicYearData(AcademicYear academicYear)
        {
            Aca_Year = academicYear.Aca_Year;
            From = academicYear.From;
            To = academicYear.To;
            Active = academicYear.Active;

        }
  
    }
}