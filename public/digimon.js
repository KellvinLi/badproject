const imgUrl = './assets/image/digimonleft.png'
const imgUrl2 = './assets/image/digimonright.png'
let isMove = false

const trigger = document.querySelector('#trigger')
let camerabutton = document.querySelector('#camera-btn')
const closeButton = document.querySelector('.close-button')
// const eggLabel = document.querySelector("#digimon-canvas-container .egg-label");
const monsterLabel = document.querySelector(
	'#digimon-canvas-container .monster-label'
)

/* Params retrieved by returning from ML5 page starts */
const queryString = window.location.search
console.log('queryString: ', queryString)
const urlParams = new URLSearchParams(queryString)
console.log('urlParams: ', urlParams)
const digimonId = urlParams.get('digimonId')
console.log('digimonId: ', digimonId)
/* Params retrieved by returning from ML5 page ends */

const socket = io.connect()
socket.on('new-mark2', (data) => {
	run()
})

camerabutton.addEventListener('click', function (e) {
	window.location.href = `/ml5.html`
})

trigger.addEventListener('click', toggleModal)

window.onload = () => {
	document.querySelector('#logout-btn').addEventListener('click', logout)

	let dragonbutton = document.querySelector('#dragon-btn')
	console.log('dragonbutton: ', dragonbutton)

	dragonbutton.addEventListener('click', function (e) {
		window.location.href = `./monster-page/digimon-detail.html`
	})
	run()
}

async function run() {
	getDigimonInfo()
	const res = await fetch('/digimon/digimon_info')

	let data = await res.json()
	console.log('/digimon_info data: ', data)

	// if no data return, use dummy value
	if (!data.name) {
		data = {
			hp: 200,
			happy_exp: 200,
			att: 70,
			digimon: 3,
			hungry: 100,
			evo: 'EVO 1'
		}
	}
}

let dragonbutton = document.querySelector('#dragon-btn')
dragonbutton.addEventListener('click', function (e) {
	window.location.href = `./monster-page/digimon-detail.html`
})

async function logout() {
	const res = await fetch(`/user/logout`, {
		method: 'POST'
	})
	console.log(res)
	if (res.ok) {
		window.location.href = '/'
	}
}

async function getDigimonInfo() {
	console.log('getDigimonInfo')

	let res = await fetch('/digimon/digimon_info')
	let data = await res.json()
	console.log('getDigimonInfo', data)

	let digimon = {
		hp: 200,
		happy_exp: 200,
		att: 70,
		digimon: 3,
		hungry: 100,
		evo: 'EVO 1'
	}
	let barDetail = document.querySelector('#bar-detail')
	barDetail.innerHTML = /* HTML */ `
    <div class="d-flex flex-align-center bar">
      <div class="hp">
        <div class="hp-text">HP</div>
        <div data-role="progress" data-value="100" style="width: 40%; margin-right: 5px;"></div>
        ${data.hp}
      </div>
    </div>
    <div class="d-flex flex-align-center bar">
      <div class="happy-exp">
        <div class="happy-exp-text">HAPPY-EXP</div>
        <div data-role="progress" data-value="100" style="width: 40%; margin-right: 5px;"></div>
        ${data.happy_exp}
      </div>
    </div>    
      <div class="d-flex flex-align-center bar">
        <div class="hungry">
          <div class="hungry-text">Hungry</div>
          <div data-role="progress" data-value="100" style="width: 40%; margin-right: 5px;"></div>
          ${data.hungry}
        </div>
      </div>
      <div class="d-flex flex-align-center bar">
        <div class="evo">
          <div class="evo-text">Evo</div>
          <div data-role="progress" data-value="100" style="width: 40%; margin-right: 5px;"></div>
          ${data.evo}
        </div>
      </div>
    </div>
	<div class="poo-icon-container" id="poo_ar">
	${data.clean ? '' : ` <img class="poo-label" src="/assets/image/poo.png"/>`}
        </div>
  `
	// below code for QR code
	const wrapper = document.querySelector('.wrapper'),
		qrInput = wrapper.querySelector('.form input'),
		generateBtn = wrapper.querySelector('.form button'),
		qrImg = wrapper.querySelector('.qr-code img')
	let preValue

	// let pooContainer = document.querySelector('#poo_arr')
	// pooContainer.innerHTML = 111

	// ${
	// 	data.clean
	// 		? ''
	// 		: ` <img class="poo-label" src="/assets/image/poo.png"/>`
	// }

	console.log('adding event listener on generateBtn')
	generateBtn.addEventListener('click', () => {
		let qrValue = qrInput.value.trim()
		if (!qrValue || preValue === qrValue) return
		preValue = qrValue
		generateBtn.innerText = 'Generating QR Code...'
		qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`
		qrImg.addEventListener('load', () => {
			wrapper.classList.add('active')
			generateBtn.innerText = 'Generate QR Code'
		})
	})

	qrInput.addEventListener('keyup', () => {
		if (!qrInput.value.trim()) {
			wrapper.classList.remove('active')
			preValue = ''
		}
	})

	const modal = document.querySelector('.modal')
	const closeButton = document.querySelector('.close-button')

	function windowOnClick(event) {
		if (event.target === modal) {
			toggleModal()
		}
	}

	window.addEventListener('click', windowOnClick)

	/* render digimon */
	console.log(!res.ok)
	if (!res.ok || !data.name) {
		monsterLabel.src = `/assets/image/Digimon_egg.png`

		console.log(monsterLabel.src)
		monsterLabel.addEventListener('click', async (e) => {
			let res = await fetch('/digimon/create_digimon', { method: 'POST' })
			// let resJson = (await res.json())[0]
			// console.log('resJson: ', resJson)
			// monsterLabel.src = `/assets/image/${data.name}1.png`
			monsterLabel.src = ''
			run()
		})
		return
	}

	if (data.name != 'Agumon') {
		monsterLabel.src = `/assets/image/${data.name}1.png`
		return
	}

	/* canvas - walking Agumon */
	let walkingContainer = document.querySelector('#digimon-canvas-container')
	let yContainerInvertedLimit =
		walkingContainer.getBoundingClientRect().y +
		walkingContainer.getBoundingClientRect() -
		200
	console.log('run2')

	let scene = sjs.Scene({ w: window.innerWidth, h: walkingContainer })
	scene.loadImages([imgUrl], function () {
		const standingAnimation = {
			size: { width: 44, height: 47 },
			offset: { x: 0, y: 0 },
			velocityX: 0,
			velocityY: 0,
			animationSize: 44 * 1
		}
		const walkingAnimation = {
			size: { width: 44, height: 47 },
			offset: { x: 96, y: 0 },
			velocityX: 100,
			velocityY: 0,
			animationSize: 44 * 3
		}
		// create the Sprite object;
		var sp = scene.Sprite(imgUrl)

		// change the visible size of the sprite
		sp.size(standingAnimation.size.width, standingAnimation.size.height)

		// apply the latest visual changes to the sprite
		// (draw if canvas, update attribute if DOM);
		sp.update()

		// change the offset of the image in the sprite
		// (this works the opposite way of a CSS background)
		// sp.offset(0, 0);

		// various transformations
		console.log(walkingContainer.getBoundingClientRect())
		console.log(window.innerHeight)
		sp.move(window.innerWidth / 4, -200)
		// sp.rotate(3.14 / 4);
		sp.scale(4)
		// sp.setOpacity(0.8);

		sp.update()

		let currentAnimation = standingAnimation
		let currentX = currentAnimation.offset.x
		let currentY = currentAnimation.offset.y
		let token = sp.dom
		// let walkingContainerInvertedLimit = walkingContainer.getBoundingClientRect().x + walkingContainer.getBoundingClientRect().width - 800
		let walkingContainerInvertedLimit = window.innerWidth
		let walkToRight = true

		let leftToRight = setInterval(() => {
			let tokenRightLimit =
				token.getBoundingClientRect().x +
				token.getBoundingClientRect().width
			sp.size(currentAnimation.size.width, currentAnimation.size.height)
			sp.offset(currentX, currentY)
			// console.log('tokenRightLimit = ', tokenRightLimit)
			// console.log('walkingContainerInvertedLimit = ', walkingContainerInvertedLimit)

			if (tokenRightLimit > 1200) {
				walkToRight = false
			}
			// console.log("tokenRightLimit: ", tokenRightLimit)
			if (tokenRightLimit < 400) {
				// console.log('walking to right')
				walkToRight = true
			}

			let moveX = walkToRight
				? currentAnimation.velocityX
				: -currentAnimation.velocityX
			if (walkToRight) {
				sp.setXScale(4)
			} else {
				sp.setXScale(-4)
			}
			// if (count < 20 ) {
			//     sp.rotate(3.14 / 4);
			// }
			// scene.Sprite(imgUrl2);

			sp.move(moveX, currentAnimation.velocityY)
			sp.update()
			currentX += currentAnimation.size.width
			if (
				currentX >=
				currentAnimation.animationSize + currentAnimation.offset.x
			) {
				currentX = currentAnimation.offset.x
			}
		}, 300)

		// document.querySelector("#start-end-btn").addEventListener("click", () => {
		//     console.log("hi")
		// })

		walkingContainer.addEventListener('click', () => {
			if (currentAnimation == walkingAnimation) {
				currentAnimation = standingAnimation
				currentX = currentAnimation.offset.x
			} else {
				currentAnimation = walkingAnimation
				currentX = currentAnimation.offset.x
			}
		})
	})
}

function toggleModal() {
	console.log('Toggle modal')
	const modal = document.querySelector('.modal')
	console.log('modal: ', modal)

	modal.classList.toggle('show-modal')
}

closeButton.addEventListener('click', toggleModal)

if (localStorage.getItem('test')) {
	alertify.alert(
		`Object detected: ${localStorage.getItem('test')}`,
		function () {
			alertify.message('Digimon status update completed')
			localStorage.clear()
		}
	)
}
