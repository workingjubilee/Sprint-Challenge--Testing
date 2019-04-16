// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './games.archive'
    },
    useNullAsDefault: true
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './test.poof'
    },
    useNullAsDefault: true,
  }

};
