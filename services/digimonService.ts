import { knex } from '../app';
console.log("1");


export default class UserService {
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

}

