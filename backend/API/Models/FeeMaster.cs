using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class FeeMaster
    {
        [Key]
        public int Fee_Id { get; set; }
        public string Fee_Name { get; set; }
        public bool Is_Compulsary { get; set; } // Set default value to true
        public string Apply_For { get; set; }
        public int Installment { get; set; }= 1;     //set defauly value is 1
        public DateTime Due_Dates { get; set; }
        public bool Each_Year { get; set; }


    }
}