const path = require('path');
const { execSync } = require('child_process');

exports.hb = require(path.join(__dirname, '../hb.json'));

exports.osname = execSync('hostnamectl | grep "Operating System" | cut -d : -f2').toString().trim();

exports.version = execSync('git rev-parse --short HEAD').toString().trim();
