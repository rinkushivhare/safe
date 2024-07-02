using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StudentsAPIDbContext context)
        {
            // Check if the database has already been seeded
            if (context.Academic_Year.Any())
            {
                return;   // Database has been seeded
            }

            // Seed initial data
            context.Academic_Year.AddRange(
                new AcademicYear
                {
                    Id = 1,
                    Aca_Year = "2023-24",
                    From = "01/06/2023",
                    To = "31/05/2024",
                    Active = false
                }
            );

            context.SaveChanges();
        }
    }
}
