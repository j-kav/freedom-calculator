<template>
    <div>
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
                <button v-on:click.prevent="createAccount">Register</button>
                <button v-on:click.prevent="getToken">Get Token</button>
                <button v-on:click.prevent="getUser">Get User</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
    var token;

    export default {
        name: 'Login',
        methods: {
            createAccount: function () {
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
            },
            getToken: function () {
                var fetchProps = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'grant_type=password&username=testEmail@email.com&password=testPassword@1'
                };
                fetch('./connect/token', fetchProps).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    alert(JSON.stringify(data));
                    token = data.access_token;
                    router.push('/');
                }).catch(function (error) {
                    alert(error);
                });
            },
            getUser: function () {
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
        }
    }
</script>