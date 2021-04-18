#!/bin/node

const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

const router = require('./routes/router');

dotenv.config('./.env');
const port = process.env.PORT;
const addr = process.env.ADDR;

app.set('view engine', 'ejs');

app.use(express.static('./views'));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	if(req.headers['x-real-ip'])
		req.ip = req.headers['x-real-ip'];
	next();
});

app.use('/', router);

app.use((req, res) => {
	console.log(`${new Date().toLocaleString('en-GB')} - Invalid request from ${req.ip}`);
	res.status(404).json({
		status: 'fail',
		message: '404 Page Not Found'
	});
});

app.listen(port, addr, (err) => {
	if(err) throw err;
	console.log(`process bound to ${addr}:${port}`);
});
