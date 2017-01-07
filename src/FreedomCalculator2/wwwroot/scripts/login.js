const Login = {
    template: `<div>
	<form id="loginForm" name="loginForm">
		<h2>Login</h2>
		<fieldset>
			<div>
				<div>
					<input id="email" type="text" max="100" placeholder="Email address" autofocus="" />
					<input type="password" id="password" max="100" placeholder="Password" />
				</div>
			</div>
			<p>
				<input id="loginButton" type="submit" value="Login" />
			</p>
            <button onclick="createAccount()">Register</button>
            <button onclick="getToken()">Get Token</button>
            <button onclick="getUser()">Get User</button>
		</fieldset>
		<a>Register new account</a>
	</form>
</div>`
}

var token;

function createAccount() {
    var fetchProps = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ GivenName: 'testName', Email: 'testEmail@email.com', Password: 'testPassword@1', ConfirmPassword: 'testPassword@1' })
    };
    fetch('/api/account', fetchProps).then(function (response) {
        if (response.ok) {
            alert('ok');
        } else {
            alert('not ok');
        }
        alert(JSON.stringify(response));
    }).catch(function (error) {
        alert(error);
    });
}
function getToken() {
    var fetchProps = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'grant_type=password&username=testEmail@email.com&password=testPassword@1'
    };
    fetch('/connect/token', fetchProps).then(function (response) {
        return response.json();
    }).then(function (data) {
        alert(JSON.stringify(data));
        token = data.access_token;
    }).catch(function (error) {
        alert(error);
    });
}
function getUser() {
    var fetchProps = {
        headers: { Authorization: 'Bearer ' + token }
    }
    fetch('/api/user', fetchProps).then(function (response) {
        return response.json();
    }).then(function (data) {
        alert(JSON.stringify(data));
    }).catch(function (error) {
        alert(error);
    });
}