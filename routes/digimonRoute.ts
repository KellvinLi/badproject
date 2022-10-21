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
//     try {
//         // let index = 41;
//         const digimon_result = await knex("digimon").select("*").where("user_id", 41);
//         // const digimon_result = await client.query(/*sql*/`SELECT * from user_id where UserId = ${index}`)
//         console.log(digimon_result);
//         res.status(200).json(digimon_result);
//         console.log(digimon_result);
//         await knex.destroy()
//         return
//     } catch (err) {
//         res.status(404).send(err);
//         await knex.destroy()
//         return
//     }

// })

//拎 user info
// digimonRoutes.get('/user_info', digimonController.userInfo)
//     try {
// let index = 41;
//         const user_result = await knex("user").select("id", "username", "image").where("id", `${index}`);
//         // const digimon_result = await client.query(/*sql*/`SELECT * from user_id where UserId = ${index}`)

//         res.status(200).json(user_result);
//         console.log(user_result);
//         return
//     } catch (err) {
//         res.status(404).send(err);
//         return
//     }
// })

//拎 battle info
digimonRoutes.get('/battle_info', digimonController.battleInfo)
//     try {
//         // let index = 41;
//         const battle_result = await knex("battle").select("*")
//         // const digimon_result = await client.query(/*sql*/`SELECT * from Digimon where UseerId = ${index}`)

//         res.status(200).json(battle_result);
//         console.log(battle_result);
//         return
//     } catch (err) {
//         res.status(404).send(err);
//         return
//     }
// })

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

//delete digimon
// digimonRoutes.delete('/delete_digimon', digimonController.deleteDigimon)
// //update digimon
// digimonRoutes.put('/ai_digimon', digimonController.aiDigimon)

// //update digimon
// digimonRoutes.put('/clean_digimon', digimonController.cleanDigimon)

// //delete digimon
// digimonRoutes.delete('/delete_digimon', digimonController.deleteDigimon)


// //update function
// memoRoutes.put("/memos/update", async (req, res) => {
//     try {
//         const memoDataUpdata = req.body.memoData;
//         console.log(memoDataUpdata);
//         let index = req.body.index;
//         console.log(index);
//         if (!index || !Number(index)) {
//             res.status(400).json({ message: "index is not a number" });
//             return;
//         }

//         await client.query(`update memos set content =$1 where id = $2`, [memoDataUpdata, Number(index)])
//         res.status(200).send("success")
//         return

//     } catch (err) {
//         console.log(err.message)
//         return
//     }
// })

// // delete function
// memoRoutes.delete("/memos/delete", async (req, res) => {
//     try {
//         let clickIndex = req.body.index;
//         // console.log(clickIndex);
//         // let data = await jsonfile.readFile(path.join(__dirname, "memo.json"));
//         // data = data.filter((memo: any, index: number) => {
//         //     console.log(memo);
//         // console.log(index);
//         // if (clickIndex == index) {
//         //     return false;
//         // } return clickIndex != index
//         // } else if (clickIndex != index) {
//         //     return true;
//         // }
//         //return clickIndex !=index
//         if (!clickIndex || !Number(clickIndex)) {
//             res.status(400).json({ message: "index is not a number" });
//             return;
//         }
//         await client.query('delete from user_like_memos where memo_id = $1', [Number(clickIndex)])
//         await client.query(`DELETE FROM memos WHERE id = ${clickIndex}`)
//         res.status(200).send("success")
//         return

//         // await jsonfile.writeFile(path.join(__dirname, "memo.json"), data, { spaces: 2 });
//         // res.status(200).send("success")
//     } catch (err) {
//         console.log(err.message)
//         return
//     }
// })

// // like function
// memoRoutes.post("/memos/like", async (req, res) => {
//     try {
//         let index = req.body.index;
//         console.log(index);
//         console.log("1");

//         console.log(req.session.userId)
//         let userId;
//         // check index 有冇野
//         if (!index || !Number(index)) {
//             res.status(400).json({ message: "index is not a number" });
//             return;
//         }
//         // check login
//         console.log(1.5);
//         console.log(req.session.userId);

//         if (req.session.userId) {
//             userId = req.session.userId
//         } else {
//             return res.status(400).json({ Message: "Please login first" })
//         }
//         console.log(1.5);

//         let checkLikeResult = await client.query(/*sql*/`SELECT * FROM user_like_memos  WHERE memo_id=($1) and user_id=($2)`, [Number(index), userId]);
//         console.log(checkLikeResult.rowCount);
//         console.log("1");
//         // let like_result = await client.query(/*sql*/`INSERT INTO user_favorite_messages (user_id,message_id) VALUES ($1,$2) RETURNING id`, [null, Number(index)]);
//         // console.log(like_result.rowCount);
//         // let delete_like = await client.query('delete from user_favorite_messages where message_id = $1', [Number(index)]);

//         console.log(1.5);
//         if (checkLikeResult.rowCount > 0) {
//             console.log(2);
//             await client.query(/*sql*/`delete from user_like_memos  where memo_id = ($1) and user_id=($2)`,
//                 [Number(index), userId]);
//             console.log(3);
//         } else {
//             console.log(4);
//             await client.query(/*sql*/`INSERT INTO user_like_memos  (memo_id,user_id) VALUES ($1,$2) RETURNING id`, [Number(index), userId]);
//             console.log(5);
//         }
//         console.log(6);
//         let memoLikedStatus = await client.query(/*sql*/`SELECT * FROM user_like_memos  WHERE memo_id=($1)`, [Number(index)]);
//         console.log(memoLikedStatus.rowCount);
//         console.log([Number(index)]);
//         await client.query(/*sql*/`Update memos set count=($1) WHERE id=($2)`,
//             [memoLikedStatus.rowCount, Number(index)]);

//         res.status(200).send("success")
//         return
//     } catch (err: any) {
//         console.log(err.message)
//         return
//     }
// })
