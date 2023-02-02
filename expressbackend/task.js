


const express = require('express');
const { Client } = require('pg');
const cors=require('cors');
const bodyParser=require('body-parser')
const connectionString = 'postgres://postgres:Finserv@2023@localhost:5432/mydb';
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";



const client = new Client({
    connectionString: connectionString
});
client.connect();
var app = express();
app.use(cors({
    origin:['http://localhost:4200','https://www.google.com/']
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exteded:false}));
app.set('port', process.env.PORT || 4000);

app.get('', function (req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
client.query("select * from emptable", function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});


app.post('/insert', function (req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
client.query(`INSERT INTO employee values (${req.body.empid},'${req.body.name}','${req.body.designation}',${req.body.age},'${req.body.location}');`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.get('/delete', function (req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
client.query("delete from emp where name='Karan Singh'", function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.get('/update', function (req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
client.query("update mydb set designation='manager' where empid=1002", function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.get('/fetch', function (req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
client.query('SELECT * FROM emp where empid = 1001', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});
app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});