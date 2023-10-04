const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'aid'
};

const pool = mysql.createPool(config);

module.exports = {
    query(sql, args) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject(err);
                } else {
                    connection.query(sql, args, function(err, rows) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                        connection.release();
                    });
                }
            });
        });
    }
};

