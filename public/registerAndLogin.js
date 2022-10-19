


async function login() {
    const loginForm = document.querySelector('#login-form')
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formElement = event.target
        // console.log(formElement)
        const username = formElement.InputUsername.value
        const password = formElement.InputPassword.value
        console.log(username);
        const loginText = document.querySelector('.login-text')

        const formData = new FormData(formElement)
        // formData.append('username', username)
        // formData.append('password', password)
        // console.log(formData.username)

        const res = await fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            console.log('Login successful')
            window.location.href = '/userProfile.html'
        } else {
            loginText.innerHTML = 'Invalid username or password'
            loginText.style.fontSize = '1.3rem'
            setTimeout(() => (loginText.innerHTML = 'Please Login'), 1000)
            setTimeout(() => (loginText.style.fontSize = '1.3rem'), 1000)
        }

    })
}
login()


async function register() {
    const registerForm = document.querySelector('#register-form')
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm)
        const res = await fetch('/user/register', {
            method: 'POST',
            body: formData,
        })

        if (res.ok) {
            console.log('Register successfully');
            window.location.href = '/registerAndLogin.html'
        } else {
            console.log('Register fail');
        }
    })
}
register()