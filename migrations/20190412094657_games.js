exports.up = function(knex) {
  return knex.schema.createTable('games', games => {
    games.increments('id');

    games
      .string('title', 255)
      .notNullable()
      .unique();

    games
      .string('genre', 255)
      .notNullable();
      
    games.integer('releaseYear');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};