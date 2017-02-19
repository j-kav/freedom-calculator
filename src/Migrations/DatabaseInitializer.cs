using FreedomCalculator2.Models;
using Microsoft.EntityFrameworkCore;

namespace FreedomCalculator2.Migrations
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
			// creates database in a way that is compatible with migrations, or performs any pending migrations if already created
			_context.Database.Migrate();
		}
	}

	public interface IDatabaseInitializer
	{
		void Seed();
	}
}
