const targets = require("./targets.json");

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
        if (!this.exposedTargets){
            this.exposedTargets = JSON.parse(JSON.stringify(targets));
            this.exposedTargets.forEach(t => {
                t.source = undefined;
            });
        }

        res.send({data: this.exposedTargets});
    }
}