using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class UpdatePerticularFee
    {
        public string Fee_Name { get; set; }
        public double Amount { get; set; }
        public string Classes { get; set; }



    }
}