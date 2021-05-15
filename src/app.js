const path = require('path')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const sqlConnect = require('./utils/connect.js');
const insertPrj = sqlConnect.insertPrj;
const insertOrg = sqlConnect.insertOrg;
const displayProject = sqlConnect.displayProject; 

app = express();

//define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public');

//sets the default engine to be hbs so the server can render the page
app.set('view engine', 'ejs');

//setup static directory to server
app.use(express.static(publicDirectoryPath));

//create application / json parser 
var urlEncodedParser = bodyParser.urlencoded({ extended : false }); 

app.use(urlEncodedParser); 

//home page kinda (for our project)
app.get('', (req, res) => {
    res.render('index', {qs: req.query});
})

// path /projectSubmission will render the projectSubmission page 
app.get('/projectSubmission', (req, res) => {
    res.render('projectSubmission');
})

// path /projectSubmission will render the projectSubmission page 
app.get('/organizationRegistration', (req, res) => {
    res.render('organizationRegistration');
})

//this will be the page to view projects
app.get('/projects', (req, res) => {
    
    displayProject((error, data) => {
        if(error) 
        {
            return res.send({error}) 
        }
        else 
        {
            console.log(data.rows)
            res.render('projects', {row : data.rows})
        }
    })
})

//submits the project submission form and inserts into the 
//Project table
// takes the form and passes the requests body
/*
    *projectName
    *duration
    *description
    *attempts
    *email 
    *consequences
    *magicWand
*/ 
app.post('/projectSubmission', urlEncodedParser, (req, res) => {
    
    res.render('name-success', {data: req.body});
    data = req.body; 
    console.log(data)
    insertPrj(data.projectName, data.description, data.duration, data.email, data.consequences, data.attempts, data.magicWand);
})


app.post('/organizationRegistration', urlEncodedParser, (req, res) => {
    
    res.render('name-success', {data: req.body});
    data = req.body; 
    console.log(data)
    insertOrg(data.name, data.address, data.headperson, data.phoneNum, data.email);
})




app.listen(3000); 
