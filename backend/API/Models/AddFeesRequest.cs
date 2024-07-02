
namespace API.Models{

    public class AddFeesRequest
    {
        public string Fee_Name { get; set; }
        public string Apply_For{ get; set; }
        public	DateTime Due_Dates	{ get; set; }
        public bool Is_Compulsary { get; set; }
         public bool Each_Year { get; set; }

        public AddFeesRequest()
       {
       }

    public AddFeesRequest(FeeMaster FeeMaster1)
    {
        Fee_Name = FeeMaster1.Fee_Name;
        Apply_For = FeeMaster1.Apply_For;
        Due_Dates = FeeMaster1.Due_Dates;
        Is_Compulsary = FeeMaster1.Is_Compulsary;
        Each_Year = FeeMaster1.Each_Year;
    }


    }
        
}