const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/', (req,res) => {

});


module.exports = router;
