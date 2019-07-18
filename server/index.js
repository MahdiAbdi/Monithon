const express = require('express');
const shell = require('shelljs');

const config = require("./config.js");
const targets = require("./targets.js");
const api = require('./api');

const db = require('./db');
db.createTablesIfNotExist();

const app = express();

app.use(function (req, res, next) {
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
        let result = execute(target.source);
        db.put(target.name, result.code, result.stdout, result.stderr);
        if (result.code !== 0 && target.failureHook)
            execute(target.failureHook);
    }, target.period);
}


app.listen(config.port, () => console.log(`Server started. Listening on port ${config.port}`))

function execute(cmd) {
    switch (cmd.type) {
        case "script":
            return shell.exec(cmd.location);
        case "url":
            return shell.exec(`curl ${cmd.location}`)
        case "dnsCheck":
            return shell.exec(`./samples/dnsCheck.sh ${cmd.location}`);
    }
}