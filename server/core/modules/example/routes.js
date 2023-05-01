import exampleMethod from './controller';

const express = require('express');

const router = express.Router();

router.get('/sample', exampleMethod);

module.exports = router;
