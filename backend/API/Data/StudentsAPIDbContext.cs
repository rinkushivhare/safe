using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StudentsAPIDbContext : DbContext
    {
        public StudentsAPIDbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentData> StudentsData { get; set; }
        public DbSet<ClassMaster> ClassMasters { get; set; }
        public DbSet<FeeMaster> Fee_Master { get; set; }
        public DbSet<FeeNameList> FeeNameList { get; set; }
        public DbSet<AcademicYear> Academic_Year { get; set; }
        //public DbSet<FeePerticular> FeePerticulars { get; set; } 
        public DbSet<User> Users { get; set; } 
        public DbSet<AddcasteRequest> Category { get; set; } 
        public DbSet<Admissions> Admission { get; set; } 


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentData>().HasKey(e => e.Student_Id);
            //modelBuilder.Entity<DynamicEntity>().HasKey(e => e.GetDynamicMemberNames());

            
        }

    }
}