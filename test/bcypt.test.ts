import { checkPassword } from '../untils/bcypt'

describe('hash', () => {
	test('check password', async () => {
		let matched = await checkPassword(
			'123456',
			'$2a$10$Ij6v0Wuuekd3ulEFODaTp.qFNHHj7StuGzGC4pPfFGOUGV4TJAIRi'
		)
		expect(matched).toBe(true)
	})
})
