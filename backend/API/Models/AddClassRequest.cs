
namespace API.Models{

    public class AddClassRequest
    {
        public string Class { get; set; }
        public string Section { get; set; }
        
        
        public AddClassRequest()
       {
       }

    public AddClassRequest(ClassMaster ClassMaster1)
    {
        Class = ClassMaster1.Class;
        Section = ClassMaster1.Section;
    }


    }
        
}