const router = require('express').Router();
const loginRouter = require('./login.js');
const meRouter = require('./me.js');
const sessionRouter = require('./session.js');
const signupRouter = require('./signup.js');

router.use('/login', loginRouter);

router.use('/me', meRouter);

router.use('/session', sessionRouter);

router.use('/signup', signupRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

 // Log out
router.delete(
    '/logout',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );










//   // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// // GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


module.exports = router;