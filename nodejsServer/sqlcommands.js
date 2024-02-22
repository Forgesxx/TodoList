
const sqlCommands = {
    createTable: `
      CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item TEXT
      );
    `,
  
    selectAll: `
      SELECT * FROM content;
    `,
  
    deleteById: `
      DELETE FROM content WHERE id = ?;
    `,
  
    insertContent: `
      INSERT INTO content (item) VALUES (?);
    `,
  };
  
  module.exports = sqlCommands;
  