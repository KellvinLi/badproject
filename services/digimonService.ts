import { knex } from '../app';
console.log("1");


export default class UserService {
    constructor() { }

    async getDigimonInfo(index: number) {
        console.log(knex);
        let digimonInfo = (await knex("digimon").select("*").where("user_id", index));
        console.log(digimonInfo);

        return digimonInfo
    }

    async getUserInfo(index: number) {
        console.log(knex);
        let userInfo = (await knex("user").select("id", "username", "image").where("id", index));
        console.log(userInfo);

        return userInfo
    }

    async getBattleInfo(index: number) {
        console.log(knex);
        let battleInfo = (await knex("battle").select("*"));
        console.log(battleInfo);

        return battleInfo
    }


}

