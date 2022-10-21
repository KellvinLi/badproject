import DigimonService from '../services/digimonService'
// import SocketIO from 'socket.io';
import { Request, Response } from "express"

import { form } from "../untils/formidable";
import { Files } from 'formidable';
// import knex from 'knex';


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

/* new DigimonService should be declared at app.ts */
/* should not have new instance at separated files */
let digimonService = new DigimonService();

export default class DigimonController {
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

    battleHistory = async (req: Request, res: Response) => {
        try {
            let index = 1;
            const battleHistory_result = await digimonService.getBattleHistoryInfo(index);
            res.status(200).json(battleHistory_result);
            console.log(battleHistory_result);
            return
        } catch (err) {
            res.status(404).send(err);
            return
        }
    }

    // createBattle = async (req: Request, res: Response) => {
    //     try {
    //         let index = 1
    //         const username = fields.username
    //         const useremail = fields.useremail
    //         const password = fields.password

    //         const newBattle_result = await digimonService.newBattle(username, useremail, hashedPassword, Object.keys(files).length > 0 ? userImageResult : null)

    //         res.status(200).json(newBattle_result);
    //         console.log(newBattle_result);
    //     } catch (err) {
    //         res.status(404).send(err);
    //         return
    //     }
    // }

    // createDigimon = async (req: Request, res: Response) => {
    //     try {
    //         let index = 1
    //         const image = "Digmon_egg.png"


    //         if (Math.random() > 0.5) {
    //             const newDigimon_result = await digimonService.newDigimon(index, image)
    //             res.status(200).json(newDigimon_result);
    //             console.log(newDigimon_result);
    //             return
    //         } else {
    //             const newDigimon_result2 = await digimonService.newDigimon(username, useremail, hashedPassword, Object.keys(files).length > 0 ? userImageResult : null)
    //             res.status(200).json(newDigimon_result2);
    //             console.log(newDigimon_result2);
    //             return
    //         }

    //     } catch (err) {
    //         res.status(404).send(err);
    //         return
    //     }
    // }
    // evoDigimon = async (req: Request, res: Response) => {
    //     try {
    //         let index = 1
    //         const image = "Digmon_egg.png"
    //         const evo = fields.useremail

    //         if (evo == 0) {
    //             if (Math.random() > 0.5) {
    //                 const newDigimon_result = await digimonService.newDigimon(index, image)
    //                 res.status(200).json(newDigimon_result);
    //                 console.log(newDigimon_result);
    //                 return
    //             } else {
    //                 const newDigimon_result2 = await digimonService.newDigimon(username, useremail, hashedPassword, Object.keys(files).length > 0 ? userImageResult : null)
    //                 res.status(200).json(newDigimon_result2);
    //                 console.log(newDigimon_result2);
    //                 return
    //             }
    //         } else if (evo == 1) {
    //             if (Math.random() > 0.5) {
    //                 const newDigimon_result = await digimonService.newDigimon(index, image)
    //                 res.status(200).json(newDigimon_result);
    //                 console.log(newDigimon_result);
    //                 return
    //             } else {
    //                 const newDigimon_result2 = await digimonService.newDigimon(username, useremail, hashedPassword, Object.keys(files).length > 0 ? userImageResult : null)
    //                 res.status(200).json(newDigimon_result2);
    //                 console.log(newDigimon_result2);
    //                 return
    //             }
    //         }
    //     } catch (err) {
    //         res.status(404).send(err);
    //         return
    //     }
    // }

    // aiDigimon = async (req: Request, res: Response) => {
    //     try {
    //         let index = 1
    //         const image = "Digmon_egg.png"
    //         const ai_Result = fields.useremail

    //         if (ai_Result === "orange") {
    //             const newDigimon_result = await digimonService.newDigimon(index, image)
    //             res.status(200).json(newDigimon_result);
    //             console.log(newDigimon_result);
    //             return
    //         } else if (ai_Result === "toilet_tissue") {
    //             const newDigimon_result2 = await digimonService.newDigimon(username, useremail, hashedPassword, Object.keys(files).length > 0 ? userImageResult : null)
    //             res.status(200).json(newDigimon_result2);
    //             console.log(newDigimon_result2);
    //             return
    //         } else if (ai_Result === "toilet_tissue") {
    //             const newDigimon_result2 = await digimonService.newDigimon(username, useremail, hashedPassword, Object.keys(files).length > 0 ? userImageResult : null)
    //             res.status(200).json(newDigimon_result2);
    //             console.log(newDigimon_result2);
    //             return
    //         }

    //     } catch (err) {
    //         res.status(404).send(err);
    //         return
    //     }
    // }

    // cleanDigimon = async (req: Request, res: Response) => {
    //     try {
    //         let index = 1
    //         const image = "Digmon_egg.png"
    //         const clean = fields.useremail

    //         if (!index || !Number(index)) {
    //             res.status(400).json({ message: "index is not a number" });
    //             return;
    //         }

    //         if (clean === false) {
    //             const cleanDigimon_result = await digimonService.cleanDigimon(index, image)
    //             res.status(200).json(cleanDigimon_result);
    //             console.log(cleanDigimon_result);
    //             return
    //         } else if (ai_Result === "toilet_tissue") {
    //             const cleanDigimon_result = await digimonService.cleanDigimon(index, image)
    //             res.status(200).json(cleanDigimon_result);
    //             console.log(cleanDigimon_result);
    //             return

    //         }

    //     } catch (err) {
    //         res.status(404).send(err);
    //         return
    //     }
    // }

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

    /* e-4. handle clean poo API Call */
    cleanPoo = async (req: Request, res: Response) => {
        // let result = await digimonService.cleanPoo(req.body.userId);
        // if true, res.json({status: 'ok'});
    }
}