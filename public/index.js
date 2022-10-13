


async function login() {
    const loginForm = document.querySelector('#login-form')
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formElement = event.target
        // console.log(formElement)
        const username = formElement.InputUsername.value
        const password = formElement.InputPassword.value
        console.log(username);

        const formData = new FormData(formElement)
        // formData.append('username', username)
        // formData.append('password', password)
        // console.log(formData.username)

        const res = await fetch('/login', {
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
        } else {
            console.log('Register fail');
        }
    })
}
register()