const express = require('express')
const router = express.Router();

const { restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// router.get('/songs',
//     requireAuth,
//     async (req, res, next) => {
//         const mySongs + >.getCurrentUserById(req.user.id);
//         return res.json(me);
// });

router.get('/',
    requireAuth,
    async (req, res, next) => {
        const me = await User.getCurrentUserById(req.user.id);
        return res.json(me);
});


module.exports = router;
