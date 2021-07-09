const mysql = require('mysql');

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
            console.log(err.code);
            return callback({success:false, message:err.code})
        }
        return callback({success:true, data:result});
    })

    con.end(() => console.log('connection closed.'));
}

const bulkDelete = (query, callback) => {
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
exports.bulkDelete = bulkDelete;