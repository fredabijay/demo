const express = require('express');
const router = express.Router();
const connection = require('../dbCon/connection');
const bulkConnection = require('../dbCon/bulkConnection');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
    let columns = ['TID', 'NAME', 'ADDRESS', 'CONTACT_PERSON', 'PHONE'];
    let query = `SELECT ?? FROM ?? ORDER BY ?`;
    connection.run(query, [columns, 'DEVELOPERS', 'NAME'], function(result) {
        if (result.error === 'true') {
            res.sendStatus(result.data);
        } else {
            if (result.data.length === 0) {
                res.status(404).json({data:'NO DATA FOUND'});
            } else {
                res.status(200).json(result.data);
            }
        }
    })
})

router.get('/:id', function (req, res) {
    let queryId = req.params.id;
    let columns = ['TID', 'NAME', 'ADDRESS', 'CONTACT_PERSON', 'PHONE'];
    let query = `SELECT ?? FROM ?? WHERE TID=?`;
    connection.run(query, [columns, 'DEVELOPERS', queryId], function(result) {
        if (result.error === 'true') {
            res.sendStatus(result.data);
        } else {
            if (result.data.length === 0) {
                res.status(404).json({data:'ID NOT FOUND'});
            } else {
                res.status(200).json(result.data);
            }
        }
    })
})

router.post('/', function(req, res) {
    let pairs = {NAME:`${req.body.name}`, ADDRESS:`${req.body.address}`, CONTACT_PERSON:`${req.body.contact_person}`, PHONE:`${req.body.phone}`};
    let query = 'INSERT INTO ?? SET ?';
    connection.run(query, ['DEVELOPERS', pairs], function(result) {
        if (result.error === 'true') {
            if (result.data === 'ER_DUP_ENTRY') {
                res.status(409).json({data:'DUPLICATE ENTRY'})
            } else {
                res.sendStatus(result.data)
            }
        } else {
            res.status(200).json(result.data);
        }
    })
})

// add later code to check if name exists before doing update
router.put('/:id', function (req, res) {
    let queryId = req.params.id;
    let name = req.body.name;
    let address = req.body.address;
    let contact_person = req.body.contact_person;
    let phone = req.body.phone;
    let query = `UPDATE ?? SET NAME=?, ADDRESS=?, CONTACT_PERSON=?, PHONE=? WHERE TID=?`;
    connection.run(query, ['DEVELOPERS', name, address, contact_person, phone, queryId], function(result) {
        if (result.error === 'true') {
            res.sendStatus(result.data);
        } else {
            res.status(200).json(result.data);
        }
    })
})

router.delete('/:id', function (req, res) {
    let queryId = req.params.id;
    let query = `DELETE FROM ??  WHERE TID=?`;
    connection.run(query, ['DEVELOPERS', queryId], function(result) {
        if (result.error === 'true') {
            res.sendStatus(result.data);
        } else {
            res.status(200).json(result.data);
        }
    })
})

module.exports = router