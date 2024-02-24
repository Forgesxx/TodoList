const sqlCommands = {

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
