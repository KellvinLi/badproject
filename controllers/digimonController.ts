import DigimonService from '../services/digimonService'
// import SocketIO from 'socket.io';
import { Request, Response } from 'express'

// import { form } from '../untils/formidable'
// import { Files } from 'formidable'


// let digimonService = new DigimonService()

export default class DigimonController {
	constructor(private digimonService:DigimonService) {}
	digimonInfo = async (req: Request, res: Response) => {
		try {
			// let index = req.body.index;
			let index = 1
			const digimon_result = await this.digimonService.getDigimonInfo(index)
			// const digimon_result = await client.query(/*sql*/`SELECT * from user_id where UserId = ${index}`)
			console.log(digimon_result)
			res.status(200).json(digimon_result)
			console.log(digimon_result)

			return
		} catch (err) {
			res.status(404).send(err)

			return
		}
	}

	battleInfo = async (req: Request, res: Response) => {
		try {
			let index = 41
			const battle_result = await this.digimonService.getBattleInfo(index)
			// const digimon_result = await client.query(/*sql*/`SELECT * from Digimon where UseerId = ${index}`)

			res.status(200).json(battle_result)
			console.log(battle_result)
			return
		} catch (err) {
			res.status(404).send(err)
			return
		}
	}

	battleHistory = async (req: Request, res: Response) => {
		try {
			let index = 1
			const battleHistory_result =
				await this.digimonService.getBattleHistoryInfo(index)
			res.status(200).json(battleHistory_result)
			console.log(battleHistory_result)
			return
		} catch (err) {
			res.status(404).send(err)
			return
		}
	}

	createDigimon = async (req: Request, res: Response) => {
		try {
			let userId = 1
			let digimonSampleId
			if (Math.random() > 0.5) {
				digimonSampleId = 1
				const newDigimon_result = await this.digimonService.newDigimon1(
					userId,
					digimonSampleId
				)
				// { user_id: userData[0].id, digimon_sample_id: digimonSample[0].id, },
				// { user_id: userData[1].id, digimon_sample_id: digimonSample[1].id, },
				// { user_id: userData[2].id, digimon_sample_id: digimonSample[2].id, }
				console.log(newDigimon_result)
				return
			} else {
				digimonSampleId = 3
				const newDigimon_result = await this.digimonService.newDigimon2(
					userId,
					digimonSampleId
				)
				res.status(200).json(newDigimon_result)
				console.log(newDigimon_result)
				return
			}
		} catch (err) {
			res.status(404).send(err)
			return
		}
	}
	evoDigimon = async (req: Request, res: Response) => {
		try {
			let userId = 1
			const evo = 1
			let digimonName = 'Agumon'
			let exp = 200

			if (!userId || !Number(userId)) {
				res.status(400).json({ message: 'index is not a number' })
				return
			}

			if (evo == 1 || digimonName == 'Agumon' || exp >= 200) {
				const evoigimon_result = await this.digimonService.evoDigimon1(
					userId
				)
				res.status(200).json(evoigimon_result)
				console.log(evoigimon_result)
				return
			} else if (evo == 1 || digimonName == 'Gabumon' || exp >= 200) {
				const evoigimon_result = await this.digimonService.evoDigimon2(
					userId
				)
				res.status(200).json(evoigimon_result)
				console.log(evoigimon_result)
				return
			}
		} catch (err) {
			res.status(404).send(err)
			return
		}
	}

	aiDigimon = async (req: Request, res: Response) => {
		try {
			let digimonId = 1
			let userId = 1
			let happyExp: number = 100
			let hp: number = 800
			let exp = Number(happyExp + 50)
			let updataHp = Number(hp + 100)
			if (!digimonId || !Number(digimonId)) {
				res.status(400).json({ message: 'index is not a number' })
				return
			}
			const ai_Result = 'orange'

			if (ai_Result === 'orange') {
				const newDigimonAction_result =
					await this.digimonService.newDigimonAction(digimonId, 1)
				const DigimonActionEat_result =
					await this.digimonService.digimonActionEat(userId, exp)
				res.status(200).json(newDigimonAction_result)
				console.log(newDigimonAction_result)
				console.log(DigimonActionEat_result)
				return
			} else if (ai_Result === 'toilet_tissue') {
				const newDigimonAction_result =
					await this.digimonService.newDigimonAction(digimonId, 2)
				const DigimonActionClean_result =
					await this.digimonService.digimonActionClean(userId, exp)
				res.status(200).json(newDigimonAction_result)
				console.log(newDigimonAction_result)
				console.log(DigimonActionClean_result)
				return
			} else if (ai_Result === 'Band Aid') {
				const newDigimonAction_result =
					await this.digimonService.newDigimonAction(digimonId, 3)
				const DigimonActionHp_result =
					await this.digimonService.digimonActionHp(userId, exp, updataHp)
				res.status(200).json(newDigimonAction_result)
				console.log(newDigimonAction_result)
				console.log(DigimonActionHp_result)
				return
			}
		} catch (err) {
			res.status(404).send(err)
			return
		}
	}

	cleanDigimonFalse = async (req: Request, res: Response) => {
		try {
			const update_count = await this.digimonService.createDigimonClean()
			res.status(200).json({ update_count })
			return
		} catch (err) {
			res.status(404).send(err)
			return
		}
	}

	digimonHungrt = async (req: Request, res: Response) => {
		try {
			const update_count = await this.digimonService.letDigimonHungrt()
			res.status(200).json({ update_count })
			return
		} catch (err) {
			res.status(404).send(err)
			return
		}
	}

	// deleteDigimon = async (req: Request, res: Response) => {
	//     try {
	//         let clickIndex = req.body.index;

	//         //return clickIndex !=index
	//         if (!clickIndex || !Number(clickIndex)) {
	//             res.status(400).json({ message: "index is not a number" });
	//             return;
	//         }
	//         await digimonService.deleteDigimonAction(index)
	//         await digimonService.deleteBattle(index)
	//         await digimonService.deleteDigimon(index)

	//         await knex("digimon_action").del();
	//         await knex("action").del();
	//         await knex("battle").del();
	//         await knex("digimon").del();
	//         res.status(200).send("success")
	//         return

	//     } catch (err) {
	//         res.status(404).send(err);
	//         return
	//     }
	// }
}
