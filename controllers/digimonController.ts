import DigimonService from '../services/digimonService'
// import SocketIO from 'socket.io';
import { Request, Response } from 'express'

enum AI_ACTION {
	ORANGE = 'orange',
	TOILET_TISSUE = 'toilet tissue',
	BAND_AID = 'Band Aid'
}
export default class DigimonController {
	constructor(private digimonService: DigimonService) {}

	digimonInfo = async (req: Request, res: Response) => {
		try {
			let userId = req.session.user?.userId || 2
			const digimon_result = await this.digimonService.getDigimonInfo(
				userId
			)
			if (digimon_result.length <= 0) {
				throw new Error('Digimon not found')
			}
			res.status(200).json(digimon_result)
			return
		} catch (err) {
			res.status(404).json({
				message: err.message
			})

			return
		}
	}

	battleInfo = async (req: Request, res: Response) => {
		try {
			let index = req.session.user?.userId || 1
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
			let index = req.session.user?.userId || 1
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
			let userId = req.session.user?.userId || 2
			let digimonSampleId
			if (Math.random() > 0.5) {
				digimonSampleId = 1
				const newDigimon_result = await this.digimonService.newDigimon(
					userId,
					digimonSampleId
				)

				res.status(200).json(newDigimon_result)
				return
			} else {
				digimonSampleId = 3
				const newDigimon_result = await this.digimonService.newDigimon(
					userId,
					digimonSampleId
				)
				res.status(200).json(newDigimon_result)
				console.log(newDigimon_result)
				return
			}
		} catch (err) {
			console.log(err)
			res.status(404).json({
				message: err.message
			})
			return
		}
	}
	evoDigimon = async (req: Request, res: Response) => {
		try {
			let userId = req.session.user?.userId || 1
			const checkDigimonInfo = await this.digimonService.getDigimonInfo(
				userId
			)

			let digimonId: number = checkDigimonInfo.id
			const evo: number = checkDigimonInfo.evo
			let digimonName: string = checkDigimonInfo.name
			let exp: number = checkDigimonInfo.happy_exp

			if (!digimonId || !Number(digimonId)) {
				res.status(400).json({ message: 'index is not a number' })
				return
			}
			if (evo == 1 || digimonName == 'Agumon' || exp >= 200) {
				const evoigimon_result = await this.digimonService.evoDigimon1(
					digimonId
				)
				res.status(200).json(evoigimon_result)
				console.log(evoigimon_result)
				return
			} else if (evo == 1 || digimonName == 'Gabumon' || exp >= 200) {
				const evoigimon_result = await this.digimonService.evoDigimon2(
					digimonId
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
			let userId = req.session.user?.userId 
			if (!userId){
				res.status(401).json({
					message:'Not yet logged in'
				})
				return
			}
			const checkDigimonInfo = await this.digimonService.getDigimonInfo(
				userId
			)

			console.log(checkDigimonInfo.id)
			console.log(checkDigimonInfo.att)
			console.log(checkDigimonInfo.hp)
			console.log(checkDigimonInfo.clean)

			let happyExp: number = checkDigimonInfo.happy_exp
			let hp: number = checkDigimonInfo.hp
			let exp = Number(happyExp + 50)
			let updataHp = Number(hp + 100)
			if (!checkDigimonInfo.id || !Number(checkDigimonInfo.id)) {
				res.status(400).json({ message: 'index is not a number' })
				return
			}
			const detectionObject = req.body.detectionObject

			if (!Object.values(AI_ACTION).includes(detectionObject)){
				res.status(401).json({
					message:"Invalid detection"
				})
				return
			}

			const action = await this.digimonService.getAction(detectionObject)
			if (!action) {
				res.status(401).json({ message: 'Invalid action' })
				return
			}
			const newDigimonAction_result =
				await this.digimonService.newDigimonAction(
					checkDigimonInfo.id,
					action.id
				)

			switch (detectionObject) {
				case AI_ACTION.ORANGE:
					await this.digimonService.digimonActionEat(userId, exp)
					break
				case AI_ACTION.TOILET_TISSUE:
					await this.digimonService.digimonActionClean(userId, exp)
					break
				case AI_ACTION.BAND_AID:
					await this.digimonService.digimonActionHp(
						userId,
						exp,
						updataHp
					)
					break
				default:
					console.log('Invalid action')
					res.status(401).json(newDigimonAction_result)
					return
			}

			res.status(200).json('')
		} catch (err) {
			console.error(err)
			res.status(500).send(err)
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
}
