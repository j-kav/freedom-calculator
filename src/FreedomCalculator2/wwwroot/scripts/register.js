const Login = {
    template: `<div>
	<form id="loginForm" name="loginForm">
		<h2>Register New Account</h2>
		<fieldset>
			<div>
				<div>
					<input id="name" type="text" max="100" placeholder="Name" autofocus="" /><br />
					<input id="email" type="text" max="100" placeholder="Email address" /><br />
					<input type="password" id="password" max="100" placeholder="Password" />
					<input type="password" id="confirmPassword" max="100" placeholder="Confirm Password" />
				</div>
			</div>
			<p>
				<input id="registerButton" type="button" value="Register" />
			</p>
		</fieldset>
	</form>
</div>`
}