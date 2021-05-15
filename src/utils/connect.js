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

//helper function that makes sure each ID is unique for it's respective table
//takes in a table name as it's param 
//runs a sql query to find the greatest id value in the table and adds one
//THIS CAN BE USED AS ONE OF OUR QUERIES FOR THE PROJECT (maybe?)
const uniqueID = (tableName, id, callback) => {

    //variable to hold the query
    findMaxQuery = "SELECT MAX(" + id + ") AS p FROM " + tableName

    //connect to the database and find the largest ID for the given table
    connection.query(findMaxQuery, (error, rows, fields) =>{
        if(error)
            callback('error', undefined, undefined); 
        else
            callback(undefined, (Number(rows[0].p + 1))); 
    })

}


// takes in params from form and sets value in SQL query / inserts
const insertProject = (name, description, duration, email, consequences, attempts, magicWand) => {

    //create function to find ID
    //placeholder 
    var projectID = 0
    var tableName = 'project'
    var idName = 'projectid'

    uniqueID(tableName, idName, (error, newID) => {
        if(error) 
            console.log(error); 
        else 
        {
            projectID = newID; 
            insertQuery = "INSERT INTO PROJECT(NAME, PROJECTID, DESCRIPTION, EMAIL, CONSEQUENCES, ATTEMPTS, MAGICWAND, DURATIONOFPROBLEM) VALUES (" + "'" + name + "'" + ', ' + "'" + projectID + "'" +"," +"'"+description+"'"+","+"'"+email+"'"+","+"'"+consequences+"'"+","+"'"+attempts+"'"+","+"'"+magicWand+"'"+","+"'"+duration+"'"+");"
            
            connection.query(insertQuery, function(error, rows, fields){
                if(error)
                    console.log(error);
                else 
                    console.log('successfully added \n\tProject:', name, '\n\tProject ID:', projectID);
            })
        }
    }); 
}

// takes in params from form and sets value in SQL query / inserts into the organization table
// 
const insertOrg = (name, address, headperson, phoneNum, email) => {

    //variable declaration 
    var orgId = 0
    var tableName = 'organization' 
    var idName = 'orgid'

    uniqueID(tableName, idName, (error, newID) => {
        if(error) 
            console.log(error); 
        else 
        {
            projectID = newID
            insertQuery = "INSERT INTO ORGANIZATION(NAME, ADDRESS, HEADPERSON, ORGID, PHONENUMBER, EMAIL) VALUES (" + "'" + name + "'" + "," + "'" + address + "'" + "," + "'" + headperson + "'" + "," + "'" + projectID + "'" + "," + "'" + phoneNum + "'" + "," +"'" + email + "'" + ");"

            connection.query(insertQuery, function(error, rows, field){
                if(error)
                    console.log(error); 
                else 
                    console.log('successfully added \n\tOrganization:', name, '\n\tProjectID:', projectID); 
            })
        }
    })
}

//gets project information from datbase and displays it
const displayProject = (callback) => {

    getProjectsQuery = 'SELECT DISTINCT NAME, DESCRIPTION, CONSEQUENCES, DURATIONOFPROBLEM, EMAIL FROM PROJECT WHERE STATUS IS NULL';

    connection.query(getProjectsQuery, function(error, rows, field){
        if(error) 
            callback('error', undefined)
        else 
            console.log(rows)
            callback(undefined, { rows : rows})
    })

}


// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404', 
//         errorMsg: 'Page not found',
//         name: 'tristan'
//     })
// })


exports.insertPrj = insertProject; 
exports.insertOrg = insertOrg; 
exports.displayProject = displayProject; 

// app.listen(1337); 