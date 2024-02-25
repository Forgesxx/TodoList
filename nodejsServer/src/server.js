'use strict';

const app = require("./app");

const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT,
    () =>
    {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
