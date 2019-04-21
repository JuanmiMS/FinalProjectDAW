const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');

const todoRoutes = express.Router();
const Data = require('./data');

const API_PORT = 9000;
app.use(cors());
app.use(bodyParser.json())

const dbRoute = "mongodb://localhost:27017/mypanel";

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

todoRoutes.route('/').get(function (req, res) {
  Data.find(function (err, datas) {
    if(err){
      console.log(err);
    }
    else{
      res.json(datas)
    }
  })
})

todoRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id
  Data.findById(id, function(err, datas){
    res.json(datas)
  })
})

todoRoutes.route('/add').post(function (req, res) {
  let data = new Data(req.body)
  data.save().then(data => {
    res.status(200).json({'todo': 'datos añadidos correctamente'})
  }).catch(err => {
    res.status(400).send('error añadiendo datos')
  })
})

todoRoutes.route


app.use('/api', todoRoutes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));