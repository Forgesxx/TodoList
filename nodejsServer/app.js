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
const express = require('express');
const app = express();

const db = new sqlite3.Database('contentUSER.db', (err) => {
    if (err) {
      console.error('Failed to connect to the database:', err.message);
    } else {
      console.log('Connection to the database is successful');
    }
  });

  db.run('CREATE TABLE IF NOT EXISTS content (id INTEGER PRIMARY KEY AUTOINCREMENT, item)');

  app.use(express.json());

  app.get('/content', (req, res) => {
    db.all('SELECT * FROM content', (err, rows) => {
      if (err) {
        console.error('Error while executing the query:', err.message);
        return res.status(500).send('Server error');
      }
  
      res.json(rows);
  
      console.log('Content from the database:', rows);
    });
  });

  app.delete('/content/:id', (req, res) => {
    const itemId = req.params.id;
  
    if (!itemId) {
      return res.status(400).json({ error: 'Missing ID parameter' });
    }

    db.run('DELETE FROM content WHERE id = ?', [itemId], function (err) {
      if (err) {
        console.error('Error while executing the query:', err.message);
        return res.status(500).send('Server error');
      }
  
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      console.log(`Content with ID ${itemId} deleted from the database`);
      res.status(200).json({ success: true });
    });
  });

  app.post('/content', (req, res) => {
    const { item } = req.body;
  
    if (!item) {
      return res.status(400).json({ error: 'Insufficient data to create content' });
    }
  
    db.run('INSERT INTO content (item) VALUES (?)', [item], function (err) {
      if (err) {
        console.error('Error while executing the query:', err.message);
        return res.status(500).send('Server error');
      }
  
      console.log(`Content added to the database with id ${this.lastID}`);
      res.json({ id: this.lastID, item });
    });
  });  


app.get('/',
(req, res) => {
    res.status(200).send('Hello, world!').end();
})

//Start the server

const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT,
    () =>
    {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
