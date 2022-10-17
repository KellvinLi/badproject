import DigimonService from '../services/digimonService'
// import SocketIO from 'socket.io';
import { Request, Response } from "express"

import { form } from "../untils/formidable";
import { Files } from 'formidable';


export function registerPromise(req: Request) {
    return new Promise<any>((resolve, reject) => {
        form.parse(req, async (err: any, fields: any, files: Files) => {
            if (err) {
                reject(err);
            }
            resolve({ fields, files })
        });
    });
}
let digimonService = new DigimonService();

export default class UserController {
    constructor() { }
    digimonInfo = async (req: Request, res: Response) => {
        try {
            // let index = req.body.index;
            let index = 47
            const digimon_result = await digimonService.getDigimonInfo(index);
            // const digimon_result = await client.query(/*sql*/`SELECT * from user_id where UserId = ${index}`)
            console.log(digimon_result);
            res.status(200).json(digimon_result);
            console.log(digimon_result);

            return
        } catch (err) {
            res.status(404).send(err);

            return
        }
    }

    userInfo = async (req: Request, res: Response) => {
        try {
            let index = 47;
            const user_result = await digimonService.getUserInfo(index);
            // const digimon_result = await client.query(/*sql*/`SELECT * from user_id where UserId = ${index}`)

            res.status(200).json(user_result);
            console.log(user_result);
            return
        } catch (err) {
            res.status(404).send(err);
            return
        }
    }

    battleInfo = async (req: Request, res: Response) => {
        try {
            let index = 41;
            const battle_result = await digimonService.getBattleInfo(index);
            // const digimon_result = await client.query(/*sql*/`SELECT * from Digimon where UseerId = ${index}`)

            res.status(200).json(battle_result);
            console.log(battle_result);
            return
        } catch (err) {
            res.status(404).send(err);
            return
        }



    }
}