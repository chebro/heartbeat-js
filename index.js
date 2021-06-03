#!/bin/node

const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config('./.env');
const port = process.env.PORT;
const addr = process.env.ADDR;

app.listen(port, addr, err => {
	if (err) throw err;
	console.log(`process bound to ${addr}:${port}`);
});
