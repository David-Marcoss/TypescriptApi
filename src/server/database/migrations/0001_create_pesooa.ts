import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.pessoas, table => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table.string('email').index().notNullable();
      
      table.bigInteger('cidadeId')
        .references("id")
        .inTable(ETableNames.cidades)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .index()
        .notNullable();

      table.comment('Tabela usada para armazenar pessoas do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pessoas}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.pessoas)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.pessoas}`);
    });
}
