var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();
var dateTime = require('node-datetime');

var bodyParser = require('body-parser');
const SQL = require('sql-template-strings')

var connection = mysql.createConnection({
  host     : 'consigo.cwgptwtbpigl.us-west-2.rds.amazonaws.com:3306',
  user     : 'visitor',
  password : 'visitor_pass',
  database : 'sandbox'
});
//local settings
/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'anderson',
  database : 'sandbox'
});*/


// bodyParser() gets the data from a POST.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get an instance of the Express Router.
var router = express.Router();





// Get the email submission form.


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

router.post('/join', function(req, res) {
    var first_name = req.body.firstName;
    var last_name = req.body.lastName;
    var email = req.body.email;
    var city = req.body.city;
    var firm = req.body.firm;
    var dt = dateTime.create();
    var dateJoined = dt.format('Y-m-d H:M:S');
        
    //console.log(last_name);
    
    connection.connect();
    
    //var dateJoined = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    var query = SQL`
    INSERT 
    INTO visitor_info 
        (first_name, last_name, email, city, firm, date_joined)
    VALUES (${first_name}, ${last_name}, ${email}, ${city}, ${firm}, ${dateJoined})`;
    
   // var query = 'insert into visitor_info() values '.concat
    
    
    
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
 
        console.log('Succesfully added to mailing list!);
        });
 
    connection.end();
    
    
   res.location('/');
    res.redirect('/');
    
});

// Tell express to use the route you just set up.
app.use(router);

app.listen(3000);
//console.log("listening on port: 3000");