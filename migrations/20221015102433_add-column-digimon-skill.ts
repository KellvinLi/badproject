import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if ((await knex.schema.hasTable("digimon"))) {
        await knex.schema.alterTable("digimon", (table) =>{
            table.string("skill");
            table.integer("max_hp");
            table.integer("level");
            table.string("type");
            table.string("name");
            table.string("attribute");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("digimon")) {
    await knex.schema.alterTable("digimon", (table) => {
        table.dropColumn("skill");
        table.dropColumn("max_hp");
        table.dropColumn("level");
        table.dropColumn("type");
        table.dropColumn("name");
        table.dropColumn("attribute");
    });
}
}

