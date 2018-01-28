const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
const private = 'z9>nV?:"&)~4*d_T[6k{T3wy2;.#Vd*+';

const connection = mysql.createConnection({
	host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	user: 'hoeyizbddk5yfbas',
	password: 'z11c19ibt769fu51',
	database: 'ul79atmbxbqwg0en'
});

app.post('/queries', function(req, res) {
  const query = req.body.query;
  const password = req.body.password;
  if (password === private) {
    connection.query(query, function(err, rows, fields) {
      res.send({ rows: rows, fields: fields});
    })
  } else {
    res.send({ error: 'Authentication failed' });
  }
});

app.get('/', function(req, res) {
	res.send('Backend is on');
});

app.listen(port, function() {
  console.log('Backend is listening on port '+ port);
});
