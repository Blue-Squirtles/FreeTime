const { Pool } = require('pg');
const poolInfo = require('./config');

const pool = new Pool(poolInfo);

module.exports = pool;
