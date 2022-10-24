import { Knex } from 'knex'
import Chance from 'chance'
const chance = new Chance()
import { hashPassword } from '../untils/bcypt'

export const skill: any = chance.pickone([
	'Babyflame',
	'MegaFlame',
	'PetitFire',
	'FoxFire'
])

export const type: any = chance.pickone(['Dinosaur', 'Beast'])

export const name: any = chance.pickone([
	'Agumon',
	'Greymon',
	'Gabumon',
	'Garurumon'
])

export async function seed(knex: Knex): Promise<void> {
	const txn = await knex.transaction()
	// Deletes ALL existing entries
	await knex.raw('ALTER SEQUENCE action_id_seq RESTART WITH 1')
	await knex.raw('ALTER SEQUENCE ' + 'battle_id_seq RESTART WITH 1')
	await knex.raw('ALTER SEQUENCE ' + 'digimon_id_seq RESTART WITH 1')
	await knex.raw('ALTER SEQUENCE ' + 'digimon_sample_id_seq RESTART WITH 1')
	await knex.raw('ALTER SEQUENCE ' + 'user_id_seq RESTART WITH 1')

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
		userArray.push({
			username: '111',
			password: await hashPassword('111'),
			email: chance.email({ domain: 'gmail.com' }),
			image: '0632419.jpg'
		})

		const userData = await txn
			.insert(userArray)
			.into('user')
			.returning('id')

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

		let users = await txn.select('*').from('user')

		const actionData = await txn('action')
			.insert([
				{ action: 'orange' },
				{ action: 'toilet tissue' },
				{ action: 'Band Aid' }
			])
			.returning('id')

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

		await txn.commit()
		return
	} catch (e) {
		await txn.rollback()
		return
	}
}
