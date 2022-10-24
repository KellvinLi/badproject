import Knex from 'knex'
import UserService from '../services/UserService'
// import { exec, ExecException } from "child_process";
// import { promisify } from 'util';
// import {seed} from '../seeds/create-users-memos'
const knexConfigs = require('../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexConfigs['test']) // Now the connection is a testing connection.

// const execPromise = promisify(exec);
// beforeAll(async () => {
//     // await execPromise(`yarn knex seed:run --env test`);
//     await seed(knex);
// })
export default class User {
	id: number
	username: string
	password: string
	image: string
	created_at: Date
	updated_at: Date
}

describe('UserService', () => {
	let service: UserService

	beforeEach(async () => {
		service = new UserService(knex)
	})

	it('should get 1 users', async () => {
		const users = await service.getUserInfo(1)
		expect(users.length).toBe(1)
	})

	it('register', async () => {
		const user = await service.registerUser(
			'Calvin',
			'abb@gmail.com',
			'123456',
			'45678'
		)

		expect(user[0].username).toBe('Calvin')
	})
})

afterAll(() => {
	knex.destroy()
})
