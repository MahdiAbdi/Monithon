const express = require('express');
const shell = require('shelljs');

const config = require("./config.js");
const targets = require("./targets.js");
const api = require('./api');

const db = require('./db');
db.createTablesIfNotExist();

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  

app.get('/', (req, res) => res.send('<h1>Dideban is UP!</h1>'))
app.get('/checkPeriod', api.checkPeriod);
app.get('/targets', api.targets);
app.get('/status', api.status)

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