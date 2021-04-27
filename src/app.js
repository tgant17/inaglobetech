const path = require('path')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const insertName = require('./utils/connect.js');

app = express();

//define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public');

//sets the default engine to be hbs so the server can render the page
app.set('view engine', 'ejs');

//setup static directory to server
app.use(express.static(publicDirectoryPath));

//create application / json parser 
var urlEncodedParser = bodyParser.urlencoded({ extended : false }); 

app.get('', (req, res) => {
    res.render('index', {qs: req.query});
})


// takes the form and passes the requests body
app.post('', urlEncodedParser, (req, res) => {
    
    res.render('name-success', {data: req.body});
    data = req.body; 
    insertName(data.first, data.last);
})




app.listen(3000); 
