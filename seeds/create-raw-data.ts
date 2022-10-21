import { Knex } from 'knex'
import Chance from 'chance'
const chance = new Chance()
import { hashPassword } from '../untils/bcypt'

const skill: any = chance.pickone([
	'Babyflame',
	'MegaFlame',
	'PetitFire',
	'FoxFire'
])
console.log(skill)
const type: any = chance.pickone(['Dinosaur', 'Beast'])
console.log(type)
const name: any = chance.pickone(['Agumon', 'Greymon', 'Gabumon', 'Garurumon'])
console.log(name)

export async function seed(knex: Knex): Promise<void> {
	const txn = await knex.transaction()
	// Deletes ALL existing entries
	await knex('digimon_action').del()
	await knex('action').del()
	await knex('battle').del()
	await knex('digimon').del()
	await knex('digimon_sample').del()
	await knex('user').del()

	try {
		let userArray: any = []

		for (let i = 0; i < 5; i++) {
			userArray.push({
				username: chance.name(),
				password: await hashPassword('123456'),
				email: chance.email({ domain: 'gmail.com' }),
				image: '0632419.jpg'
			})
		}
		const userData = await txn
			.insert(userArray)
			.into('user')
			.returning('id')
		console.log(userData)

		// Inserts seed entries
		// const userTable = await txn("user").insert([
		//     { username : chance.name(), password: "AAAA",email:chance.email({domain: 'gmail.com'}),image:"./assets/digimon/Digmon_egg.png" },
		// ]).returning('id');
		// console.log(userTable);

		const digimonSample = await txn('digimon_sample')
			.insert([
				{
					name: 'Agumon',
					image: 'Agumon1.png',
					skill: 'Babyflame',
					type: 'Dinosaur'
				},
				{
					name: 'Greymon',
					image: 'Greymon1.png',
					skill: 'MegaFlame',
					max_hp: 2000,
					type: 'Dinosaur'
				},
				{
					name: 'Gabumon',
					image: 'Gabumon1.png',
					skill: 'PetitFire',
					type: 'Beast'
				},
				{
					name: 'Garurumon',
					image: 'Garurumon1.png',
					skill: 'FoxFire',
					max_hp: 2000,
					type: 'Beast'
				}
			])
			.returning('id')
		console.log(digimonSample)

		const digimonData = await txn('digimon')
			.insert([
				{
					user_id: userData[0].id,
					digimon_sample_id: digimonSample[0].id
				},
				{
					user_id: userData[1].id,
					digimon_sample_id: digimonSample[1].id
				},
				{
					user_id: userData[2].id,
					digimon_sample_id: digimonSample[2].id
				},
				{
					user_id: userData[3].id,
					digimon_sample_id: digimonSample[3].id
				},
				{
					user_id: userData[4].id,
					digimon_sample_id: digimonSample[0].id
				}
			])
			.returning('id')
		console.log(digimonData)

		let users = await txn.select('*').from('user')
		console.log({ users })

		// const battleData = await txn('battle').insert([
		// 	{
		// 		player1_id: userData[4].id,
		// 		player2_id: userData[0].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 900,
		// 		player2_got_damage: 1000,
		// 		player1_win: false,
		// 		player2_win: true
		// 	},
		// 	{
		// 		player1_id: userData[3].id,
		// 		player2_id: userData[1].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 100,
		// 		player2_got_damage: 1000,
		// 		player1_win: false,
		// 		player2_win: true
		// 	},
		// 	{
		// 		player1_id: userData[2].id,
		// 		player2_id: userData[2].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 800,
		// 		player2_got_damage: 1000,
		// 		player1_win: false,
		// 		player2_win: true
		// 	},
		// 	{
		// 		player1_id: userData[1].id,
		// 		player2_id: userData[3].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 1000,
		// 		player2_got_damage: 500,
		// 		player1_win: true,
		// 		player2_win: false
		// 	},
		// 	{
		// 		player1_id: userData[0].id,
		// 		player2_id: userData[4].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 600,
		// 		player2_got_damage: 1000,
		// 		player1_win: false,
		// 		player2_win: true
		// 	},
		// 	{
		// 		player1_id: userData[0].id,
		// 		player2_id: userData[4].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 1000,
		// 		player2_got_damage: 900,
		// 		player1_win: true,
		// 		player2_win: false
		// 	},
		// 	{
		// 		player1_id: userData[4].id,
		// 		player2_id: userData[3].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 600,
		// 		player2_got_damage: 1000,
		// 		player1_win: false,
		// 		player2_win: true
		// 	},
		// 	{
		// 		player1_id: userData[3].id,
		// 		player2_id: userData[2].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 1000,
		// 		player2_got_damage: 600,
		// 		player1_win: true,
		// 		player2_win: false
		// 	},
		// 	{
		// 		player1_id: userData[2].id,
		// 		player2_id: userData[1].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 600,
		// 		player2_got_damage: 1000,
		// 		player1_win: false,
		// 		player2_win: true
		// 	},
		// 	{
		// 		player1_id: userData[1].id,
		// 		player2_id: userData[0].id,
		// 		player1_hp: 1000,
		// 		player2_hp: 1000,
		// 		player1_got_damage: 1000,
		// 		player2_got_damage: 900,
		// 		player1_win: true,
		// 		player2_win: false
		// 	}
		// ])
		// console.log(battleData)

		// for (let i = 0; i < 10; i++) {
		//     actionArray.push({ action: chance1.random() })
		// }
		// const actionData = await txn.insert(actionArray).into("action").returning('id');
		// console.log(actionData);
		const actionData = await txn('action')
			.insert([
				{ action: 'orange' },
				{ action: 'toilet tissue' },
				{ action: 'Band Aid' }
			])
			.returning('id')
		console.log({ actionData })

		const digimonactionData = await txn('digimon_action').insert([
			{ action_id: actionData[0].id, digimon_id: digimonData[0].id },
			{ action_id: actionData[1].id, digimon_id: digimonData[1].id },
			{ action_id: actionData[2].id, digimon_id: digimonData[2].id },
			{ action_id: actionData[1].id, digimon_id: digimonData[3].id },
			{ action_id: actionData[0].id, digimon_id: digimonData[4].id },
			{ action_id: actionData[1].id, digimon_id: digimonData[4].id },
			{ action_id: actionData[2].id, digimon_id: digimonData[3].id },
			{ action_id: actionData[2].id, digimon_id: digimonData[2].id },
			{ action_id: actionData[1].id, digimon_id: digimonData[1].id },
			{ action_id: actionData[0].id, digimon_id: digimonData[0].id }
		])
		console.log({ digimonactionData })

		await txn.commit()
		return
	} catch (e) {
		console.log(e)
		await txn.rollback()
		return
	}
}
