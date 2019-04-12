const express = require('express');
const app = express();

const initDatabase = require('./init_database');
initDatabase().catch(err => console.error(err));

app.listen(3000);