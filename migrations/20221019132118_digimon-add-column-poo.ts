import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    /** 
     * b-1
     * next_poo_time DATE
     * have_poo BOOLEAN
     */
}


export async function down(knex: Knex): Promise<void> {
    /**
     * b-2
     * drop above add columns
     */
}

