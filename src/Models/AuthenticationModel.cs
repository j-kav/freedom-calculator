using System.ComponentModel.DataAnnotations;

namespace FreedomCalculator2.Models
{
	public class AuthenticationModel
	{
		[Required]
		public string Username { get; set; }

		[Required]
		public string Password { get; set; }
	}
}
