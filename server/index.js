const express = require('express');
const shell = require('shelljs');

const config = require("./config.js");
const targets = require("./targets.js");
const api = require('./api');

const db = require('./db');
db.createTablesIfNotExist();

const app = express();

app.get('/', (req, res) => res.send('<h1>Dideban is UP!</h1>'))
app.get('/checkPeriod', api.checkPeriod);
app.get('/targets', api.targets);


for (let i = 0; i < targets.length; i++) {
    let target = targets[i];
    setInterval(() => {
        if (target.source.type === "script") {
            let result = shell.exec(target.source.path);
            db.put(target.name, result.code, result.stdout, result.stderr);
        }
    }, target.period);
}


app.listen(config.port, () => console.log(`Server started. Listening on port ${config.port}!`))