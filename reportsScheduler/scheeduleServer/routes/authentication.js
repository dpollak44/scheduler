const router = require('express').Router();
const db = require('../modules/pool.js');
// var cors = require('cors')

// router.use(require('cors')({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));


router.post('/register', async (req, res, next) => {
  if (!req.body.name || !req.body.password) {
    return next(new Error('User and password are required'));
  }

  db.query(`select * from users where user = ?`,
    [req.body.name],
    (error, result) => {
      console.log(result)
      if (error) return next(new Error(`Unable to verify user ${error.message}`));
      if (result.length > 0) return next(new Error(`Username Taken`));

      db.query(`INSERT INTO users(user,password)
      VALUES(?,?)`,
        [req.body.name, req.body.password],
        (error, result) => {
          if (error) return next(new Error(`Unable to add item ${error.message}`));
          // if (error) { console.log(error) };
          if (!result.affectedRows) return next(new Error(`Unable to register`));

          const user = {
            username: req.body.name,
            password: req.body.password,
          };
          res.status(201).send(user);
        });
    });


  console.log(req.body)
});

router.get('/register', async (req, res, next) => {
  console.log(req.session.name, req.session.password)
  res.send(req.session.name, req.session.password);
});


router.get('/login', async (req, res, next) => {
  console.log(req.session.name, req.session.password)
  res.status(200).send(req.session.name + req.session.password);
});

router.post('/login', async (req, res, next) => {
  console.log(req.body.name, req.body.password)
  db.query(`select * from users where user = ?`,
    [req.body.name],
    (error, result) => {
      if (error) return next(new Error(`Unable to add login ${error.message}`));
      if (!result.length) return next(new Error(`Invalid username and password`));
      if (result[0].password !== req.body.password) return next(new Error(`Invalid username and password`));
      console.log(result[0].user)
      req.session.user = req.body.name;
      console.log('1', req.session.user)
      res.end();
    });


});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.end();
});

module.exports = router;