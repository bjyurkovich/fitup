var express = require('express');
var app = express();
passport = require('passport');
BasicStrategy = require('passport-http').BasicStrategy;
var bodyParser = require('body-parser');


//DB stuff
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: "localhost",
	user : "root",
	password : "coleslaw",
	database : "fituprising"
});

//Use for POSTed JSON
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use('/', express.static(__dirname + '/'));

//Authentication
app.use(passport.initialize());
passport.use(new BasicStrategy({
  },
  function(username, password, done) {

  		q = "SELECT * from User WHERE email='"+ username + "' and password='"+password+"'";

		connection.query(q, function(err, rows, fields) {

		  if (!err && rows.length == 1){
		  	 obj = rows[0];
		  	 delete obj['password'];

		  	 return done(null, obj)
		  }
		  else{
		  	return done(null, false);
		  }
		}); 
  }
));
auth = function(){
	return passport.authenticate('basic', { session: false });
}


/*WEBAPP SERVING*/
app.get('/', function(req,res){
	res.sendfile('index.html'); 
})




/*app.get('/user/:id', auth(), function(req, res){
	//console.log(req.param('id'));

	q = "SELECT * FROM User WHERE id=?";
	connection.query(q, [req.param('id')], function(err, rows, fields){
		if(err ){
			console.log(err);
			res.json({
				error : err
			});
		}

		if(rows.length == 1){
			res.json(rows[0]);
		}

	})

	
})*/

/*
Creates a new user (requires authentication)
To create a new user, POST to /user with headers:

Content-Type: application/json
Authorization: Basic [base64 encoded username:password]

{
"firstName" : "userFirstName",
"lastName" : "userLastName",
"email" : "test@email.com",
"number" : "2134567890",
"password" : "test123"
}

You should receive response:
{
    "status": "success",
    "id": 4
}
*/
/*app.post('/user', auth(), function(req, res){

	q = "INSERT INTO `flipfone`.`User` (`firstName`, `lastName`, `email`, `password`, `number`) VALUES (?,?,?,?,?);";

	connection.query(q, [
		req.body.firstName,
		req.body.lastName,
		req.body.email,
		req.body.password,
		req.body.number
		], function(err, info){
			
			//check for error
			if(err){
				console.log(err);
				res.json({
					error: err
				})
			}

			//return the success and insert id
			res.json({
				status : "success",
				id: info.insertId
			})
		})
})

app.get('/verify', function(req, res){

	//DB access here and biz logic

	res.json({
		"status" : "ok"
	})

})

app.post('/call', function(req, res){

	//DB stuff here

	res.json({
		"status" : "ok"
	})

})*/

var server = app.listen(3000, function(){

})