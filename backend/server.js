const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config')

const API_PORT = 9000;
app.use(cors());
app.use(bodyParser.json())

const dbRoute = config.get('mongoURI')

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.static(path.join(__dirname, '../build')));
app.use('/api/users', require('./routes/users'))
app.use('/api/works', require('./routes/works'))
app.use('/api/ownTask', require('./routes/ownTask'))


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));