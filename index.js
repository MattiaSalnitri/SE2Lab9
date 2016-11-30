var express = require('express');
//general lib
var app = express();
//connect DB
var pg = require('pg');
//GET
var util = require('util');
//post
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())// JSON

app.set('port', (process.env.PORT || 5000));

app.get('/select/', function(request, response) 
{
	var text = 'responce:';
	response.writeHead(200, {'Content-Type': 'text/html'});

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		//query
		client.query('SELECT * FROM test_table', function(err, result) {
			done();//release the client back to the pool
			
			if (err){ 
				console.error(err); 
				response.end("Error select" + err); 
		  	}
		  	else {
			    console.log("ok");
				text = "<p>Dump db: <br> " + util.inspect(result) + ".</p>";
				text = text + "<br> <br>";
			    console.log("text: "+text);
		  	}
		});
  	});
 
	console.log("text final: "+text);
	response.end(text);

});

app.get('/create/', function(request, response) 
{
	var text = 'responce:';
	response.writeHead(200, {'Content-Type': 'text/html'});
	
	console.log("called");

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		
		console.log("connected to db");
	
		//create table	
		client.query('create table test_table (id integer, name text)', function(err, result) {
		  done();
		  if (err)
		   { console.error(err); response.send("Error " + err); }
		  else
		   { response.render('pages/db', {results: result.rows} ); }
		});

		//add element
		client.query('insert into test_table values (1, \'hello database\')', function(err, result) {
		  done();
		  if (err)
		   { console.error(err); response.send("Error insert " + err); }
		  else
		   { }
		});
  	});
  	
	console.log("text: "+text);
	response.end(text);

});

app.get('/add/', function(request, response) 
{
	var text = 'responce:';
	response.writeHead(200, {'Content-Type': 'text/html'});
	
	console.log("called");

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		
		console.log("connected to db");

		//add element
		client.query('insert into test_table values (1, \'hello database\')', function(err, result) {
		  done();
		  if (err)
		   { console.error(err); response.send("Error insert " + err); }
		  else
		   { }
		});
  	});
  	
	console.log("text: "+text);
	response.end(text);

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
