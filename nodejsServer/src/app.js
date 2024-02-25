'use strict';
const cors = require('cors');
const express = require('express');
const DBController = require('./dbController');
const apiURIs = require('./apiURIs');
const app = express();

app.use(cors());
app.use(express.json());

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
            console.log("Error on getAllItems: " + JSON.stringify(error.message));
            res.status(500).json({ error: { message: error.message, }, });
        }
    });

app.post(apiURIs.addItem,
    async (req, res) =>
    {
        try
        {
            const items = req.body;
            if (items.length === 0)
            {
                res.status(200).json([]);
                return;
            }

            const dbController = await DBController.getInstance();

            const result = [];

            for (let i = 0; i < items.length; i++)
            {
                const itemText = items[i];
                const item = await dbController.addItem(itemText); // expect result { id: <item-id> }
                item.item = itemText;
                result.push(item);
            }

            res.status(200).json(result);
        }
        catch(error)
        {
            console.log("Error on addItem: " + JSON.stringify(error.message));
            res.status(500).json({ error: { message: error.message, }, });
        }
    });

app.post(apiURIs.setItem,
    async (req, res) =>
    {
        try
        {
            const items = req.body;
            if (items.length === 0)
            {
                res.status(200).send();
                return;
            }

            const dbController = await DBController.getInstance();

            for (let i = 0; i < items.length; i++)
            {
                const item = items[i];
                await dbController.setItem(items[i]);
            }

            res.status(200).send();
        }
        catch(error)
        {
            console.log("Error on setItem: " + JSON.stringify(error.message));
            res.status(500).json({ error: { message: error.message, }, });
        }
    });

app.post(apiURIs.deleteItem,
    async (req, res) =>
    {
        try
        {
            const itemIds = req.body;
            if (itemIds.length === 0)
            {
                res.status(200).send();
                return;
            }

            const dbController = await DBController.getInstance();

            for (let i = 0; i < itemIds.length; i++)
            {
                const itemId = itemIds[i];

                await dbController.deleteItem(itemId);
            }

            res.status(200).send();
        }
        catch(error)
        {
            console.log("Error on deleteItem: " + JSON.stringify(error.message));
            res.status(500).json({ error: { message: error.message, }, });
        }
    });

app.get('/',
    (req, res) =>
    {
        res.status(200).send('Hello, world!').end();
    });

module.exports = app;
