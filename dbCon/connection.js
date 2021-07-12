const mysql = require('mysql');
const config = require('./config.js');

const get_info = (query, arr, callback) => {
    // const con = mysql.createConnection({
    //     host:'localhost',
    //     port:3307,
    //     database:'realty',
    //     user:'root',
    //     password:'bluedolphin'
    // });

    const con = mysql.createConnection(config.databaseOptions);

    con.connect(function(err) {
        if (err) {
            return callback({error:'true', data:err.code})
        }
        console.log('Connected');
    })

    con.query(query, arr, function(err, result, fields) {
        if (err) {
            return callback({error:'true', data:err.code})
        }
        return callback({error:'false', data:result});
    })

    con.end(() => console.log('connection closed.'));
}

const set_info = (query, arr, callback) => {
    const con = mysql.createConnection({
        host:'localhost',
        port:3307,
        database:'realty',
        user:'root',
        password:'bluedolphin'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log('Connected');
    })

    con.query(query, arr, function(err, result) {
        if (err) {
            return callback({error:'true', data:err.code})
        }
        let insertId = result.insertId;
        return callback({error:'false', data:insertId})
    })

    con.end(() => console.log('connection closed.'));
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
exports.get_info = get_info;
exports.set_info = set_info;