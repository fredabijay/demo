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
    let query = `SELECT TID, NAME, ADDRESS, CONTACT_PERSON, PHONE
    FROM DEVELOPERS  
    ORDER BY NAME`;
    connection.get_info(query, function(result) {
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
    let query = `SELECT TID, NAME, ADDRESS, CONTACT_PERSON, PHONE
    FROM DEVELOPERS  
    WHERE TID=${req.params.id}`;
    connection.get_info(query, function(result) {
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
    let query = `INSERT INTO DEVELOPERS(NAME, ADDRESS, CONTACT_PERSON, PHONE) 
    VALUES('${req.body.name}','${req.body.address}','${req.body.contact_person}','${req.body.phone}')`;
    connection.set_info(query, function(result) {
        res.send(result);
    })
})

module.exports = router