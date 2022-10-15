import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const txn = await knex.transaction();
    try {
        await txn.schema.createTable('user', (table) => {
            table.increments(); //id
            table.string('username', 30).notNullable().unique(); //username
            table.string("password", 80).notNullable();
            table.string('email', 100).notNullable().unique();
            table.string('image', 255).notNullable();
            table.timestamps(false, true);
        });
        await txn.schema.createTable('digimon', (table) => {
            table.increments();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.integer('happy_exp').notNullable().defaultTo(0);
            table.integer('hp').notNullable().defaultTo(100);
            table.integer('att').notNullable().defaultTo(10);
            table.integer('hungry').notNullable().defaultTo(100);
            table.integer('evo').notNullable().defaultTo(1);
            table.string('image', 255).notNullable();
            table.boolean("clean").notNullable().defaultTo(true);
            table.boolean('dead').notNullable().defaultTo(false);
            table.timestamps(false, true);
        });
        await txn.schema.createTable('battle', (table) => {
            table.increments();
            table.integer('player1_id').unsigned();
            table.foreign('player1_id').references('digimon.id');
            table.integer('player2_id').unsigned();
            table.foreign('player2_id').references('digimon.id');
            table.integer('player1_hp').notNullable();
            table.integer('player2_hp').notNullable();
            table.integer('player1_got_damage').notNullable();
            table.integer('player2_got_damage').notNullable();
            table.boolean('player1_win').notNullable();
            table.boolean('player2_win').notNullable();
            table.timestamps(false, true);
        });
        await txn.schema.createTable('action', (table) => {
            table.increments();
            table.string('action').notNullable();
            table.timestamps(false, true);
        });
        await txn.schema.createTable('digimon_action', (table) => {
            table.increments();
            table.integer('action_id').unsigned();
            table.foreign('action_id').references('action.id');
            table.integer('digimon_id').unsigned();
            table.foreign('digimon_id').references('digimon.id');
            table.timestamps(false, true);
        });
        await txn.commit();
        return;
    } catch (e) {
        console.log(e)
        await txn.rollback();
        return;
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('digimon_ai');
    await knex.schema.dropTableIfExists('ai');
    await knex.schema.dropTableIfExists('battle');
    await knex.schema.dropTableIfExists('digimon');
    await knex.schema.dropTableIfExists('user');
}
