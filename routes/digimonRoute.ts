import express from 'express'
// import { Request, Response } from 'express'
// import { knex } from "../app";
// import { client } from '../utils/DB'
// import formidable from 'formidable'
import DigimonController from '../controllers/digimonController'
// import { knex } from "knex";
// import { client } from '../utils/DB'
// import formidable from 'formidable'
import cron from 'node-cron'
import DigimonService from '../services/digimonService'


export const digimonRoutes = express.Router()


let digimonService = new DigimonService()
let digimonController = new DigimonController(digimonService)

//拎 digimon info
digimonRoutes.get('/digimon_info', digimonController.digimonInfo)

//拎 battle info
digimonRoutes.get('/battle_info', digimonController.battleInfo)

//拎 battle history
digimonRoutes.get('/battle_history', digimonController.battleHistory)

//開一隻新digimon
digimonRoutes.post('/create_digimon', digimonController.createDigimon)

//update digimon
digimonRoutes.put('/evo_digimon', digimonController.evoDigimon)

//create digimon ai
digimonRoutes.post('/ai_digimon', digimonController.aiDigimon)

//update digimon clean
digimonRoutes.put('/clean_digimon_false', digimonController.cleanDigimonFalse)

//let digimon hungrt
digimonRoutes.put('/digimon_hungrt', digimonController.digimonHungrt)


let job = cron.schedule('* * * * *', async function jobYouNeedToExecute() {
	await digimonService.createDigimonClean()
    await digimonService.letDigimonHungrt()
})
job.start()

// //delete digimon
// digimonRoutes.delete('/delete_digimon', digimonController.deleteDigimon)

