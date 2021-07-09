const express = require('express');
const app = express();
const path = require('path');

const developers = require('./routes/developers')

const PORT = process.env.port || 3001;

app.use(express.json()); // json post will not work without this.
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use('/developers', developers);

app.get('/api', (req, res) => {
    res.json({msg: 'api endpoint'});
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
})

app.listen(PORT, err => {
    if (err) {
        return console.log("Error ", err);
    }
    console.log(`Listening in port ${PORT}`);
})