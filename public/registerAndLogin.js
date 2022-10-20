async function login() {
	const loginForm = document.querySelector('#login-form')
	loginForm.addEventListener('submit', async (event) => {
		event.preventDefault()

		const formElement = event.target
		// console.log(formElement)
		const username = formElement.InputUsername.value
		const password = formElement.InputPassword.value
		console.log(username)
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
			loginText.innerHTML = 'Login successful!'
			setTimeout(() => (window.location.href = '/userProfile.html'), 1000)
			loginText.style.fontSize = '1.3rem'
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
		e.preventDefault()
		const formData = new FormData(registerForm)
		const registerText = document.querySelector('.register-text')

		const res = await fetch('/user/register', {
			method: 'POST',
			body: formData
		})

		if (res.ok) {
			console.log('Register successfully')
			registerText.innerHTML = 'Sign-up successful!'
			setTimeout(
				() => (window.location.href = '/registerAndLogin.html'),
				1000
			)
			loginText.style.fontSize = '1.3rem'
			// window.location.href = '/registerAndLogin.html'
		} else {
			console.log('Register fail')
			registerText.innerHTML = 'Invalid username or password'
			registerText.style.fontSize = '1.3rem'
			setTimeout(() => (registerText.style.fontSize = '1.5rem'), 1000)
			setTimeout(() => (registerText.innerHTML = 'Sign Up'), 1000)
		}
	})
}
register()
