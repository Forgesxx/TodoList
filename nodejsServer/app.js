// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const express = require('express');
const app = express();
const sqlCommands = require('./sqlcommands.js');

app.use(cors());

const db = new sqlite3.Database('contentUSER.db', (err) =>
{
    if (err)
    {
        console.error('Failed to connect to the database:', err.message);
    }
    else
    {
        console.log('Connection to the database is successful');
    }
});

function handleError(errorMessage, err, res)
{
    console.error(errorMessage, err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message, });
}

db.run(sqlCommands.createTable);
app.use(express.json());
app.post('/getAllItems',
    (req, res) =>
    {
        db.all(sqlCommands.selectAll,
            (err, rows) =>
            {
                if (err)
                {
                    handleError('Error while executing the query:', err, res);
                    return;
                }
                res.json(rows);
                console.log('Content from the database:', rows);
            });
    });

app.post('/deleteItem',
    (req, res) =>
    {
        const { ids, } = req.body;
        if (!ids || !Array.isArray(ids))
        {
            res.status(400).json({ error: 'Invalid input format, expected array of ids', });
            return;
        }
        const placeholders = ids.map(() => '?').join(', ');
        const deleteQuery = `DELETE FROM content WHERE id IN (${placeholders})`;

        db.run(deleteQuery, ids,
            function (err)
            {
                if (err)
                {
                    handleError('Error while executing the query:', err, res);
                    return;
                }

                console.log(`Items with IDs ${ids.join(', ')} deleted from the database`);
                res.status(200).json({ success: true, });
            });
    });

app.post('/addItem',
    (req, res) =>
    {
        const { item, } = req.body;

        if (!item)
        {
            res.status(400).json({ error: 'Invalid input format, expected item', });
            return;
        }

        db.run(sqlCommands.insertContent, [item,],
            function (err)
            {
                if (err)
                {
                    handleError('Error while executing the query:', err, res);
                    return;
                }

                console.log(`Content added to the database with id ${this.lastID}`);
                res.status(200).json({ id: this.lastID, });
            });
    });

app.post('/setItem',
    (req, res) =>
    {
        const { id, newContent, } = req.body;
        if (!id || newContent === undefined)
        {
            res.status(400).json({ error: 'Invalid input format, expected id and newContent', });
            return;
        }

        const updateQuery = 'UPDATE content SET item = ? WHERE id = ?';

        db.run(updateQuery, [newContent, id,],
            function (err)
            {
                if (err)
                {
                    handleError('Error while executing the query:', err, res);
                    return;
                }

                console.log(`Content for item with ID ${id} updated in the database`);
                res.status(200).json({ success: true, });
            });
    });

app.get('/',
    (req, res) =>
    {
        res.status(200).send('Hello, world!').end();
    });

const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT,
    () =>
    {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
