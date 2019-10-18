using FreedomCalculator2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FreedomCalculator2.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly FreedomCalculatorConfig _optionsAccessor;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<FreedomCalculatorConfig> optionsAccessor)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _optionsAccessor = optionsAccessor.Value;
        }

        [HttpPost("~/api/authenticate"), Produces("application/json")]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticationModel authModel)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(authModel.Username);
            Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, authModel.Password, lockoutOnFailure: true);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            // authentication successful so generate jwt token
            string jwtToken = CreateJwt(user);
            return Ok(jwtToken);
        }

        [Authorize]
        [HttpPost("~/api/refreshToken"), Produces("application/json")]
        public async Task<IActionResult> RefreshToken()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return BadRequest(new { message = "Not signed in" });
            }

            string jwtToken = CreateJwt(user);
            return Ok(jwtToken);
        }

        private string CreateJwt(ApplicationUser user)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_optionsAccessor.JWTSecret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    // new Claim(ClaimTypes.Name, user.Id.ToString())
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string jwtToken = tokenHandler.WriteToken(token);
            return jwtToken;
        }

        // POST api/account
        [HttpPost]
        public async Task Post([FromBody]RegistrationModel user)
        {
            if (ModelState.IsValid)
            {
                if (await _userManager.FindByEmailAsync(user.Email) == null)
                {
                    ApplicationUser newUser = new ApplicationUser
                    {
                        UserName = user.Email,
                        Email = user.Email,
                        EmailConfirmed = true,
                        GivenName = user.GivenName
                    };
                    IdentityResult userResult = await _userManager.CreateAsync(newUser, user.Password);
                }
            }
        }
    }
}
