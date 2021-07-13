const mysql = require('mysql');
const config = require('./config.js');

const run = (query, arr, callback) => {
    const pool = mysql.createPool(config.databaseOptions);

    pool.getConnection(function(err, connection) {
        if (err) {
            return callback({error:'true', data:err.code})
        }
        console.log('Connected');
        connection.query(query, arr, function(err, result, fields) {
            if (err) {
                return callback({error:'true', data:err.code})
            }
            return callback({error:'false', data:result});
        })
    
        connection.release((err) => { 
            if (err) {
                return callback({error:'true', data:err.code})
            } else {
                console.log('Connection released');
            }
        });
    })
}

const bulkUpdate = (query, callback) => {
    const con = mysql.createConnection({
        host:'localhost',
        port:3307,
        database:'realty',
        user:'root',
        password:'bluedolphin',
        multipleStatements: true
    });

    con.connect(function(err) {
        if (err) {
            return callback({success:false, message:err.code})
        }
        console.log('Connected');
    })

    con.query(query, function(err, result, fields) {
        if (err) {
            return callback({success:false, message:err.code})
        }
        return callback({success:true, data:result});
    })

    con.end(() => console.log('connection closed.'));
}

exports.bulkUpdate = bulkUpdate;
exports.run = run;
