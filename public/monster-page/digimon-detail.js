window.onload = () => {
	getDigimonInfo()
}

let backbutton = document.querySelector('#back-btn')

console.log('backbutton: ', backbutton)

backbutton.addEventListener('click', function (e) {
	window.location.href = `/digimon.html`
})

let dragonbutton = document.querySelector('#dragon-btn')

console.log('dragonbutton: ', dragonbutton)

// dragonbutton.addEventListener("click", function (e) {

//   window.location.href = `/battle-history/battle-history.html`;

// })

const socket = io.connect()
socket.on('new-mark', (data) => {
	getDigimonInfo()
})

async function getDigimonInfo() {
	let res = await fetch('/digimon/digimon_info')
	let data = await res.json()
	console.log('getDigimonInfo>>>>>>>>>>', data)

	let upperDetailRow = document.querySelector('#upper-detail-row')
	upperDetailRow.innerHTML = /* HTML */ `
		<div class="cell" style="margin-top: 5rem;">
			<div
				class="container-fluid d-flex flex-column flex-justify-between"
				style="height: 90%;"
			>
				<!-- TODO: add column at digimon table for level -->
				<div class="row">${data.evo}</div>
				<div class="agumon-img">
					<img src="/assets/image/${data.image}" />
				</div>
				<div class="row flex-column">
					<div class="container-fluid">${data.id}</div>
					<div class="container-fluid">${data.type}</div>
					<div class="container-fluid">${data.evo}</div>
				</div>
			</div>
		</div>
		<div
			class="cell card text-dark bg-light mb-3 "
			style="width: 18rem; background: rgb(29,191,236) !important; opacity: 0.7; border-radius: 10px;margin-top: 5rem; height: 75%;"
		>
			<div>Stats</div>
			<div class="d-flex flex-align-center bar">
				<div class="hp">
					<div class="hp-text">hp</div>
					<div
						data-role="progress"
						data-value="100"
						style="width: 40%; margin-right: 5px;"
					></div>
					${data.hp}
				</div>
			</div>
			<div class="d-flex flex-align-center bar">
				<div class="happy-exp">
					<div class="happy-exp-text">HAPPY-EXP</div>
					<div
						data-role="progress"
						data-value="100"
						style="width: 40%; margin-right: 5px;"
					></div>
					${data.happy_exp} to Next Level
				</div>
			</div>
			<div class="d-flex flex-align-center bar">
				<div class="att">
					<div class="att-text">Att</div>
					<div
						data-role="progress"
						data-value="100"
						style="width: 40%; margin-right: 5px;"
					></div>
					${data.att}
				</div>
			</div>
			<div class="d-flex flex-align-center bar">
				<div class="hungry">
					<div class="hungry-text">Hungry</div>
					<div
						data-role="progress"
						data-value="100"
						style="width: 40%; margin-right: 5px;"
					></div>
					${data.hungry}
				</div>
			</div>
			<div class="d-flex flex-align-center bar">
				<div class="evo">
					<div class="evo-text">Evo</div>
					${data.evo}
				</div>
			</div>
			<div class="d-flex flex-align-center bar">
				<div class="skill">
					<div class="skill-text">Skill</div>
					${data.skill}
				</div>
			</div>
		</div>
	`
}

getDigimonInfo()
