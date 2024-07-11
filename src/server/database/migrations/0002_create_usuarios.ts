import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.usuarios, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').notNullable();
      table.string('email').unique().index().notNullable();
      table.string('senha').checkLength(">=",8).index().notNullable();

      
      table.comment('Tabela usada para armazenar usuarios do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.usuarios}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.usuarios)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.usuarios}`);
    });
}
