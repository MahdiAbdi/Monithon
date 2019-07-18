const express = require('express');
const shell = require('shelljs');

const config = require("./config.json");
const targets = require("./targets.json");

const app = express()

app.get('/', (req, res) => res.send('<h1>Dideban is UP!</h1>'))
app.get('/checkPeriod', (req, res) => res.send(`${config.checkPeriod}`))


for (let i = 0; i < targets.length; i++) {
    let target = targets[i];
    setInterval(() => {
        if (target.source.type === "script") {
            let result = shell.exec(target.source.path);
        }
    }, target.period);
}


app.listen(config.port, () => console.log(`Server started. Listening on port ${config.port}!`))