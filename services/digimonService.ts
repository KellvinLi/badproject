import { knex } from '../app';



export default class DigimonService {
    constructor() { }

    async getDigimonInfo(index: number) {

        let digimonInfo = (await knex("digimon").select("*").where("user_id", index));
        console.log(digimonInfo);

        return digimonInfo
    }



    async getBattleInfo(index: number) {

        let battleInfo = (await knex("battle").select("*").where("player1_id", index).orWhere("player2_id", index));
        console.log(battleInfo);

        return battleInfo
    }

    async getBattleHistoryInfo(index: number) {

        let battleInfo = (await knex.raw(`
        with home_win as (
            select count(*) win_count from battle b  where b.player1_id  = ${index} and b.player1_win = TRUE
            ),
            away_win as (
            select count(*) win_count from battle b  where b.player2_id  = ${index} and b.player2_win = TRUE
            ),
            avg_hp as (
            select (hp/2000::float)*100 as hp from digimon d  where user_id  = ${index} 
            ),
            avg_att as (
            select (att/200::float)*100 as att  from digimon d  where user_id  = ${index} 
            ),
            
            match_history as (
            select 
            
            (select win_count from home_win) + (select win_count from away_win) as total_win_count,
            (select count(*) win_count from battle b  where b.player1_id =${index} or b.player2_id =${index}) as total_match_count,
            ((select hp from avg_hp) + (select att from avg_att))/2    as avg_score
            )
            select 
            u.id,
            u.username,
            u.email,
            u.image,
            avg_score,
            total_win_count,
            total_match_count,
            (total_win_count/total_match_count::float)*100 as win_rate
            
            from match_history  
            join "user" u on u.id = ${index}
            
            `)).rows;
        console.log(battleInfo);

        return battleInfo
    }

    /* a-2. don't need API call here, instead to use time count to trigger this check */
    async checkPoo () {
        /** 
         * a-3 
         * UPDATE all digimon to set have_poo = true
         * WHERE have_poo = false
         * AND ( next_poo_time < Date.now() OR next_poo_time IS NULL)
         * RETURNING *
         * 
         * will ignore digimon which already have shit (have_poo = true)
         * */

        /**
         * a-4 
         * io.emit to notify users if any of them are currently logon
         * this may use user_id to recognize connection with user, 
         * user_id come from above RETURNING *
         * */ 

        return;
    }

    /* e-5. receive API call to clean poo, manually triggered by poo button */
    async cleanPoo(userId: number): Promise<boolean>{
        // UPDATE digimon SET have_poo = false, next_poo_time = Date.now() + MIN(30)
        // WHERE user_id = $1, userId
        // RETURNING *

        // if userId = result.user_id, return true, else return false
        return true;
    }
}

