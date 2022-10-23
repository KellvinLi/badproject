import { knex } from '../app'
export default class UserService {
	constructor() {}

	async checkUserName(username: string) {
		let usersname = await knex
			.select('*')
			.from('user')
			.where('username', username)
		return usersname
	}

	async checkUserEmail(email: string) {
		let users = await knex.select('*').from('user').where('email', email)
		return users
	}

	async registerUser(
		username: string,
		email: string,
		password: string,
		image: string
	) {
		let registerUser = await knex
			.table('user')
			.insert([
				{
					username,
					email,
					password,
					image
				}
			])
			.returning('*')
		return registerUser
	}

	async getUserInfo(index: number) {
		let userInfo = await knex('user')
			.select('id', 'username', 'image')
			.where('id', index)
		return userInfo
	}
}
