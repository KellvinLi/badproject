import { knex } from '../app';
console.log("User");
export default class UserService {
    constructor() { }



    async checkUserName(username: string) {
        console.log(knex);

        let usersname = await knex.select('*').from('user').where('username', username);
        console.log(usersname);

        return usersname
    }

    async checkUserEmail(email: string) {
        console.log(email);
        let users = await knex.select('*').from('user').where('email', email);
        // let users = (await knex.raw(/*sql*/`SELECT * FROM user WHERE email = $1`, [email])).rows
        console.log(users);
        return users
    }

    async registerUser(username: string, email: string, password: string, image: string) {
        // const userData = await knex.insert(
        //     {
        //         username, password, email, image: "0632419.jpg"
        //     }
        // ).into("user").returning('id');

        let registerUser = (await knex.table('user').insert([{
            username,
            email,
            password,
            image
        }]).returning("*"))

        console.log("registerUser: ", registerUser)
        // let registerUser = (await knex.raw(`INSERT INTO user (username,email,password,image) VALUES (?,?,?,?) RETURNING *`,
        //     [username, email, password, image])).rows[0]
        return registerUser
    }

}
