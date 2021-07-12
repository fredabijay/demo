const mysql = require('mysql');

const get_info = (query, callback) => {
    const con = mysql.createConnection({
        host:'localhost',
        port:3307,
        database:'realty',
        user:'root',
        password:'bluedolphin'
    });

    con.connect(function(err) {
        if (err) {
            return callback({error:'true', data:err.code})
        }
        console.log('Connected');
    })

    con.query(query, function(err, result, fields) {
        if (err) {
            return callback({error:'true', data:err.code})
        }
        return callback({error:'false', data:result});
    })

    con.end(() => console.log('connection closed.'));
}

const test_set_info = (query, post, callback) => {
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

    con.query(query, post, function(err, result) {
        if (err) {
            console.log(err.code);
            if(err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
                return callback({success:false, message:'duplicate entry'})
            }
            else {
                return callback({success:false, message:err.code})
            }
        }
        let insertId = result.insertId;
        return callback({success:true, message:insertId})
    })

    con.end(() => console.log('connection closed.'));
}

const set_info = (query, callback) => {
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

    con.query(query, function(err, result) {
        if (err) {
            console.log(err.code);
            if(err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
                return callback({success:false, message:'duplicate entry'})
            }
            else {
                return callback({success:false, message:err.code})
            }
        }
        let insertId = result.insertId;
        return callback({success:true, message:insertId})
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
exports.test_set_info = test_set_info;