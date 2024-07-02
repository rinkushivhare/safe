using System;
using System.Collections.Generic;
using System.Linq;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class DatabaseManager
    {
        public static void CreateTable(StudentsAPIDbContext context)
        {
            // Retrieve necessary data from the database
            var feeNames = context.Fee_Master.Select(s => s.Fee_Name.Replace(" & ", "_").Replace(" ", "_").Replace("-", "_")).ToList();
            var academicyear = context.Academic_Year.FirstOrDefault(y => y.Active);
            var activeYear = academicyear != null ? academicyear.Aca_Year.Replace("-", "") : ""; // Retrieve active year and format it

            string sqlScript = $@"
                CREATE TABLE IF NOT EXISTS Fee_Perticular{activeYear} (
                    Class VARCHAR(50) NOT NULL,
                    {string.Join(", ", feeNames.Select(feeName => $"{feeName} DOUBLE NOT NULL DEFAULT 0.0"))},
                    PRIMARY KEY (Class)
                );
            ";


            context.Database.ExecuteSqlRaw(sqlScript);

            string createTableSql = $@"
                CREATE TABLE IF NOT EXISTS Category (
                    Category VARCHAR(50) NOT NULL,
                    Caste TEXT NULL,
                    PRIMARY KEY (Category)
                );
            ";

            context.Database.ExecuteSqlRaw(createTableSql);

            string createAdmission = $@"
                CREATE TABLE IF NOT EXISTS Admission (
                    Admission_No LONG NOT NULL,
                    Academic_Year TEXT NOT NULL,
                    Admission_Date DATETIME NOT NULL,
                    Student_Name TEXT NOT NULL,
                    Student_Class TEXT NOT NULL,
                    Student_Section TEXT NOT NULL,
                    Student_Id TEXT NULL,
                    Apply_AdmFee BOOL DEFAULT 1,
                    FeeTractAdm TEXT NULL,
                    ClassTract TEXT NULL,
                    PRIMARY KEY (Admission_No)
                );
            ";

            context.Database.ExecuteSqlRaw(createAdmission);

            string FeeConcession = $@"
                CREATE TABLE IF NOT EXISTS Fee_Concession{activeYear} (
                    Admission_No LONG NOT NULL,
                    {string.Join(", ", feeNames.Select(feeName => $"{feeName} DOUBLE NOT NULL DEFAULT 0.0"))},
                    PRIMARY KEY (Admission_No)
                );
            ";

            context.Database.ExecuteSqlRaw(FeeConcession);

        }

         public static void SaveClasses(StudentsAPIDbContext context)
        {
            var classes = context.ClassMasters.Select(s => s.Class).ToList();
            var academicyear = context.Academic_Year.FirstOrDefault(y => y.Active);
            var activeYear = academicyear != null ? academicyear.Aca_Year.Replace("-", "") : ""; // Retrieve active year and format it
            foreach (var className in classes)
            {

                string insertStatement = $@"
                    INSERT INTO Fee_Perticular{activeYear} (Class) 
                    VALUES ('{className.Replace("'", "''")}') 
                    ON CONFLICT(Class) DO NOTHING"; // Prevent duplicates

                context.Database.ExecuteSqlRaw(insertStatement);

                
            }

            string [] categories = {"SC", "ST", "VT", "NT", "SBC", "OBC", "OPEN", "OTHER"};
            foreach (var categ in categories)
            {
                string insertStatement = $@"
                    INSERT INTO Category (Category) 
                    VALUES ('{categ}') 
                    ON CONFLICT(Category) DO NOTHING"; // Prevent duplicates

                context.Database.ExecuteSqlRaw(insertStatement);
                
            }

            var admission_NO = context.Admission.Select(s => s.Admission_No).ToList();
            foreach (var adm in admission_NO)
            {

                string insertStatement = $@"
                    INSERT INTO Fee_Concession{activeYear} (Admission_No) 
                    VALUES ('{adm}') 
                    ON CONFLICT(Admission_No) DO NOTHING"; // Prevent duplicates

                context.Database.ExecuteSqlRaw(insertStatement);

                
            }

        }

    }
}
