var mysql = require('mysql');
var express = require('express');

var app = express();

var connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'inaglobe'
    });

connection.connect(function(error){
    if(error)
    {
        console.log('Error'); 
    }
    else 
    {
        console.log('Connected to Database'); 
    }
});

app.get('/', function(req, resp) {

    connection.query("SELECT DISTINCT First FROM names", function(error, rows, fields){
        if(error) 
            console.log(error); 
        else 
            console.log('successful query');
            console.log(rows);
    });
})

const insertProject = (name, description, estlen, estcost, category, status, user) => {
    connection.query("INSERT INTO PROJECTS VALUES (" + "'" + first + "'" + ', ' + "'" + last + "'" + ');', function(error, rows, fields){
        if(error)
            console.log(error);
        else 
            console.log('successfully added ' + first + ' ' + last + ' to the names table');
    })
}

module.exports = insertName; 

// app.listen(1337); 