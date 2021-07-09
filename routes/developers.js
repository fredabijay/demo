const express = require('express');
const router = express.Router();
const connection = require('../dbCon/connection');
const bulkConnection = require('../dbCon/bulkConnection');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
    let query = `SELECT TID, NAME, ADDRESS, CONTACT_PERSON, PHONE
    FROM DEVELOPERS  
    ORDER BY NAME`;
    connection.get_info(query, function(result) {
        res.json({'response':result});
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