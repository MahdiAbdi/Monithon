const targets = require("./targets.js");
const db = require('./db');

module.exports = {
    checkPeriod: function (req, res) {

        const targetName = req.query.target;
        if (targetName) {
            let target = targets.find(t => t.name === targetName);
            if (!target) {
                res.status(404);
                res.send({ message: "Target name not found." })
                return;
            }

            res.send({ data: [target.period] })
        } else {
            res.status(400);
            res.send({ message: "Missing 'target' query parameter." })
        }
    },
    targets: function (req, res) {
        if (!this.exposedTargets) {
            this.exposedTargets = JSON.parse(JSON.stringify(targets));
            this.exposedTargets.forEach(t => {
                t.source = undefined;
            });
        }

        res.send({ data: this.exposedTargets });
    },
    status: function (req, res) {
        const targetName = req.query.target;

        if (targetName) {
            db.getLastStatus(targetName)
                .then(t => {
                    res.send({ data: [t] });
                })
                .catch(e => {
                    res.status(500);
                    res.send({ message: e });
                })
        } else {
            db.getAllLastStatuses()
                .then(targets => {
                    res.send({ data: targets });
                })
                .catch(err => {
                    res.status(500);
                    res.send({ message: err });
                })
        }
    }
}