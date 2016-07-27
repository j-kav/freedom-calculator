using FreedomCalculator2.Models;

namespace FreedomCalculator2
{
	public class DatabaseInitializer : IDatabaseInitializer
	{
		private readonly ApplicationDbContext _context;

		public DatabaseInitializer(ApplicationDbContext context)
		{
			_context = context;
		}

		public void Seed()
		{
			_context.Database.EnsureCreated();
		}
	}

	public interface IDatabaseInitializer
	{
		void Seed();
	}
}
