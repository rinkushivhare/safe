using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class FeeNameList
    {
        [Key]
         public int Fee_Id{ get; set; }

        public string Fee_Name { get; set; }

    }
}