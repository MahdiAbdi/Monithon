const config = require('./config.js');
const mysql = require('mysql');

const TABLE_NAME = "checkResults";

var connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

module.exports = {
    createTablesIfNotExist: function () {

        connection.query('show tables', (error, rows, fields) => {
            if (!rows.map(r => r[fields[0].name]).includes(TABLE_NAME))
                connection.query(`CREATE TABLE ${TABLE_NAME} ( id BIGINT NOT NULL AUTO_INCREMENT, name VARCHAR(255), exitcode INT NOT NULL, time DATETIME NOT NULL DEFAULT NOW(), stdout TEXT, stderr TEXT, PRIMARY KEY (id))`);
        });
    },
    put: function (name, exitcode, stdout, stderr) {
        connection.query(`INSERT INTO ${TABLE_NAME} (name, exitcode, stdout, stderr) VALUES ('${name}', ${exitcode}, '${stdout}', '${stderr}')`, (err) => {
            if (err)
                console.error(err);
        });
    },
    getLastStatus: function (targetName) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * from ${TABLE_NAME} WHERE name = '${targetName}' ORDER BY id DESC LIMIT 1`,
                (err, rows, fields) => {
                    if (err)
                        return reject(err);
                    
                    resolve(rows[0]);
                })
        });
    },
    getAllLastStatuses: function () {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM (SELECT max(id) as maxid from ${TABLE_NAME} GROUP BY name) AS ids JOIN ${TABLE_NAME} on id=ids.maxid`,
                (err, rows, fields) => {
                    if (err)
                        return reject(err);
                    
                    resolve(rows);
                })
        });
    }
}