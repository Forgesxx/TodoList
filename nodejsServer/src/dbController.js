const sqlite3 = require('sqlite3').verbose();

class DBController
{
    static createTableQuery =
        `CREATE TABLE IF NOT EXISTS content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item TEXT
        );`;

    static selectAllQuerry =
        `SELECT * FROM content;`;

    static addItemQuerry =
        `INSERT INTO content (item) VALUES (?);`;

    static instance = null;

    static async getInstance(aDbName)
    {
        if (DBController.instance == null)
        {
            DBController.instance = new DBController(aDbName);
            await DBController.instance.initDB();
            await DBController.instance.createTable();
        }

        return DBController.instance;
    }

    static async close()
    {
        if (DBController.instance != null)
        {
            await DBController.instance.close();
        }
    }

    constructor(aDbName)
    {
        if (!aDbName)
        {
            this.dbName = 'contentUSER.db';
        }
        else
        {
            this.dbName = aDbName;
        }
        this.db = null;
    }

    async initDB()
    {
        return new Promise(
            (resolve, reject) =>
            {
                this.db = new sqlite3.Database(this.dbName,
                    (err) =>
                    {
                        if (err)
                        {
                            reject(err);
                            console.error('Failed to connect to the database:', err.message);
                        }
                        else
                        {
                            console.log('Connection to the database is successful.');
                            resolve();
                        }
                    });
            }
        );
    }

    async createTable()
    {
        return new Promise(
            (resolve, reject) =>
            {
                this.db.run(DBController.createTableQuery,
                    function(error)
                    {
                        if (error)
                        {
                            reject(error);
                        }
                        resolve();
                    });
            }
        );
    }

    async close()
    {
        return new Promise(
            (resolve, reject) =>
            {
                this.db.close(
                    function(error)
                    {
                        if (error)
                        {
                            reject(error);
                        }
                        resolve();
                    });
            }
        );
    }

    async getAll()
    {
        return new Promise(
            (resolve, reject) =>
            {
                this.db.all(DBController.selectAllQuerry,
                    function(err, rows)
                    {
                        if (err)
                        {
                            reject(err);
                        }
                        console.log('Content from the database:', rows);
                        resolve(rows);
                    });
            });
    }

    async addItem(anItemText)
    {
        return new Promise(
            (resolve, reject) =>
            {
                this.db.run(DBController.addItemQuerry, [anItemText,],
                    function(err)
                    {
                        if (err)
                        {
                            reject(err);
                        }
                        console.log('add item las id:', this.lastID);
                        resolve({ id: this.lastID, });
                    });
            });
    }
}
module.exports = DBController;
