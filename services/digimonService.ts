import { io, knex } from '../app'

export default class DigimonService {
	constructor() {}

	async getDigimonInfo(userId: number) {
		let digimonInfo = await knex.raw(
			`SELECT *
            FROM digimon d 
            left JOIN digimon_sample ds  on d.digimon_sample_id  =ds.id 
            where  user_id = ?;`,
			[userId]
		)
		return digimonInfo.rows.length > 0 ? digimonInfo.rows[0] : []
	}

	async getBattleInfo(index: number) {
		let battleInfo = await knex('battle')
			.select('*')
			.where('player1_id', index)
			.orWhere('player2_id', index)
		return battleInfo
	}

	async getBattleHistoryInfo(index: number) {
		let battleInfo = await knex('battle')
			.select('*')
			.where('player1_id', index)
			.orWhere('player2_id', index)
		return battleInfo
	}
	getAction = async (actionName: string) => {
		let action = await knex
			.select('*')
			.from('action')
			.where({ action: actionName })
			.first()
		return action
	}
	async newDigimon(userId: number, digimonSampleId: number) {
		let isExistingEgg =
			(await knex('digimon').select('id').where('user_id', userId))
				.length > 0
		if (isExistingEgg) {
			throw new Error('digimon already exists')
		}

		let newDigimon1_result = await knex('digimon')
			.insert([{ user_id: userId, digimon_sample_id: digimonSampleId }])
			.returning('*')

		/* TODO: get a full result like getDigimonInfo */
		// let result = await knex

		let result = await knex('digimon')
			.join('digimon_sample', 'digimon_name', 'digimon_image')
			.where({ 'id ': userId })
		console.log(result)

		return newDigimon1_result
	}

	async evoDigimon1(digimonId: number) {
		let evoDigimon1_result = await knex('digimon')
			.update({
				digimon_sample_id: 2,
				evo: 2,
				att: 200
			})
			.where('id ', digimonId)
		return 'Gone'
	}

	async evoDigimon2(digimonId: number) {
		let evoDigimon1_result = await knex('digimon')
			.update({
				digimon_sample_id: 4,
				evo: 2,
				att: 200
			})
			.where('id ', digimonId)
		return 'Gone'
	}

	async newDigimonAction(digimonId: number, actionId: number) {
		let newDigimon2_result = await knex('digimon_action')
			.insert([{ digimon_id: digimonId, action_id: actionId }])
			.returning('*')
		return newDigimon2_result
	}
	async digimonActionEat(userId: number, exp: number) {
		let digimonActionEat_result = await knex('digimon')
			.update({
				hungry: 100,
				happy_exp: exp
			})
			.where('user_id', userId)
		return digimonActionEat_result
	}
	async digimonActionClean(userId: number, exp: number) {
		let digimonActionEat_result = await knex('digimon')
			.update({
				clean: true,
				happy_exp: exp
			})
			.where('user_id', userId)
		return digimonActionEat_result
	}

	async digimonActionHp(userId: number, exp: number, updataHp: number) {
		let digimonActionEat_result = await knex('digimon')
			.update({
				hp: updataHp,
				happy_exp: exp
			})
			.where('user_id', userId)
		return digimonActionEat_result
	}
	async createDigimonClean() {
		let digimon_ids = await knex.table('digimon').select('id')
		digimon_ids = digimon_ids.map((obj) => obj.id)
		digimon_ids = digimon_ids.filter((obj) => {
			return Math.random() > 0.8
		})
		let update_count = await knex('digimon')
			.update({
				clean: false
			})
			.whereIn('user_id', digimon_ids)
		return
	}

	async letDigimonHungrt() {
		let digimon_ids = await knex.table('digimon').select('id', 'hungry')
		// let new_digimon_ids = digimon_ids.map((obj) => obj.id)
		// let new_digimon_hungry = digimon_ids.map((obj) => obj.hungry - 1)
		// console.log({ digimon_ids })
		// console.log({ new_digimon_ids })
		// console.log({ new_digimon_hungry })
		// console.log({ digimon_ids })

		// let update_count = await knex('digimon')
		// .update({
		// 	hungry:
		// })
		// .whereIn('user_id', new_digimon_ids)

		for (let digimon_id of digimon_ids) {
			await knex('digimon')
				.update({
					hungry: (digimon_id.hungry -= 1)
				})
				.where('user_id', digimon_id.id)
		}

		io.emit('new-mark', { message: 'New Mark' })
		io.emit('new-mark2', { message: 'New Mark' })

		return
	}
}
