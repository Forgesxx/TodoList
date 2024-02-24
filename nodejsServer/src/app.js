'use strict';
const cors = require('cors');
const express = require('express');
const DBController = require('./dbController');
const apiURIs = require('./apiURIs');
const app = express();

app.use(cors());
app.use(express.json());

// function handleError(errorMessage, err, res)
// {
//     console.error(errorMessage, err.message);
//     res.status(500).json({ error: 'Internal Server Error', message: err.message, });
// }

app.post(apiURIs.getAllItems,
    async (req, res) =>
    {
        try
        {
            const dbController = await DBController.getInstance();
            const rows = await dbController.getAll();
            res.status(200).json(rows);
        }
        catch(error)
        {
            console.log("Error on getAllItems: " + JSON.stringify(error));
            res.status(500).json({ error: error, });
        }
    });

app.post(apiURIs.addItem,
    async (req, res) =>
    {
        try
        {
            const dbController = await DBController.getInstance();
            const items = req.body;
            if (items.length === 0)
            {
                throw new Error("Empty add item is not allowed.");
            }
            const itemText = items[0];

            const rows = await dbController.addItem(itemText);
            res.status(200).json(rows);
        }
        catch(error)
        {
            console.log("Error on getAllItems: " + JSON.stringify(error));
            res.status(500).json({ error: error, });
        }
    });

// app.post('/addItem',
//     (req, res) =>
//     {
//         const { item, } = req.body;

//         if (!item)
//         {
//             res.status(400).json({ error: 'Invalid input format, expected item', });
//             return;
//         }

//         db.run(sqlCommands.insertContent, [item,],
//             function (err)
//             {
//                 if (err)
//                 {
//                     handleError('Error while executing the query:', err, res);
//                     return;
//                 }

//                 console.log(`Content added to the database with id ${this.lastID}`);
//                 res.status(200).json({ id: this.lastID, });
//             });
//     });

// app.post('/deleteItem',
//     (req, res) =>
//     {
//         const { ids, } = req.body;
//         if (!ids || !Array.isArray(ids))
//         {
//             res.status(400).json({ error: 'Invalid input format, expected array of ids', });
//             return;
//         }
//         const placeholders = ids.map(() => '?').join(', ');
//         const deleteQuery = `DELETE FROM content WHERE id IN (${placeholders})`;

//         db.run(deleteQuery, ids,
//             function (err)
//             {
//                 if (err)
//                 {
//                     handleError('Error while executing the query:', err, res);
//                     return;
//                 }

//                 console.log(`Items with IDs ${ids.join(', ')} deleted from the database`);
//                 res.status(200).json({ success: true, });
//             });
//     });

// app.post('/setItem',
//     (req, res) =>
//     {
//         const { id, newContent, } = req.body;
//         if (!id || newContent === undefined)
//         {
//             res.status(400).json({ error: 'Invalid input format, expected id and newContent', });
//             return;
//         }

//         const updateQuery = 'UPDATE content SET item = ? WHERE id = ?';

//         db.run(updateQuery, [newContent, id,],
//             function (err)
//             {
//                 if (err)
//                 {
//                     handleError('Error while executing the query:', err, res);
//                     return;
//                 }

//                 console.log(`Content for item with ID ${id} updated in the database`);
//                 res.status(200).json({ success: true, });
//             });
//     });

app.get('/',
    (req, res) =>
    {
        res.status(200).send('Hello, world!').end();
    });

module.exports = app;
