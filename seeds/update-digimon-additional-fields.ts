import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries

    /*
    await knex("table_name").update([
        { id: 1, colName: "skill" },
        { id: 2, colName: "max_hp" },
        { id: 3, colName: "level" },
        { id: 4, colName: "type"},
        { id: 5, colName: "name"},
        { id: 6, colName: "attribute"}
    ]);
    .where("skill", "PEPPER BREATH", "max_hp", "3000", "level", "3", "type", "Vaccine, Virus, Data", "name", "agumon", )
    */
    let user_id: any = (await knex.select('*').from('user').limit(1))[0].id;


    await knex('digimon').update({
        skill: 'No skill',
        max_hp: '0',
        level: '1',
        type: 'unknown',
        name: 'digimon-egg',
        attribute: 'unknown'
    }).where('user_id', user_id);

    await knex('digimon').update({
        skill: 'Pepper-Breath',
        max_hp: '1000',
        level: '2',
        type: 'Reptile',
        name: 'agumon',
        attribute: 'Vaccine'
    }).where('user_id', user_id + 1);

    await knex('digimon').update({
        skill: 'Nova-Blast',
        max_hp: '2000',
        level: '3',
        type: 'Dinosaur',
        name: 'greymon',
        attribute: 'Vaccine'
    }).where('user_id', user_id + 2);

    await knex('digimon').update({
        skill: 'Blue-Blaster',
        max_hp: '1000',
        level: '2',
        type: 'Reptile',
        name: 'greymon',
        attribute: 'Data'
    }).where('user_id', user_id + 3);

    await knex('digimon').update({
        skill: 'Howling-Blaster',
        max_hp: '2000',
        level: '3',
        type: 'beast',
        name: 'garurumon',
        attribute: 'Data'
    }).where('user_id', user_id + 4);
};
