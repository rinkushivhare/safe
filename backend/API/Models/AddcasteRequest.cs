using System.ComponentModel.DataAnnotations;

namespace API.Models{

    public class AddcasteRequest
    {
        [Key]
        public string Category { get; set; }
        public string? Caste { get; set; }
    }
}