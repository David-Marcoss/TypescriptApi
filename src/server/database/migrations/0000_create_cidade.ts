import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.cidades, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).index().notNullable();

      table.comment('Tabela usada para armazenar cidades do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.cidades}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.cidades)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.cidades}`);
    });
}
