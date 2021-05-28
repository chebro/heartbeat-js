#!/bin/node

const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

const mainRouter = require('./routes/mainRouter');
const statsRouter = require('./routes/statsRouter');

dotenv.config('./.env');
const port = process.env.PORT;
const addr = process.env.ADDR;

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

app.use((req, _res, next) => {
	req.ipReal = req.ip;
	if (req.headers['x-real-ip']) req.ipReal = req.headers['x-real-ip'];
	next();
});

app.use('/', mainRouter);
app.use('/stats', statsRouter);

app.use((req, res) => {
	console.log(
		`${new Date().toLocaleString('en-GB')} - Invalid request from ${req.ipReal} - ${
			req.originalUrl
		}`
	);
	res.status(404).json({
		status: 'fail',
		message: '404 Page Not Found',
	});
});

app.listen(port, addr, err => {
	if (err) throw err;
	console.log(`process bound to ${addr}:${port}`);
});
