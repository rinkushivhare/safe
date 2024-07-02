using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class UpdateConcessionFee
    {
        public long Admission_No { get; set; }
        public List<FeeData> Fees { get; set; }

    }
    public class FeeData
    {
        public string Fee_Name { get; set; }
        public double Amount { get; set; }
    }

}