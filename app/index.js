const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const { MORGAN_FORMAT } = require('../config/application');

const app = express();

app.use(morgan(MORGAN_FORMAT));
app.use(express.json());

module.exports = router.apply(app);