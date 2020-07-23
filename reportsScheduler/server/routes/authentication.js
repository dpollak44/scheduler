const router = require('express').Router();
const db = require('../pool');
var cors = require('cors')

router.use(require('cors')({
  origin: 'http://localhost:3000',
  credentials: true
}));


router.post('/register', async (req, res, next) => {
  if (!req.body.name || !req.body.password) {
    // return next(new Error('User and password are required'));
    console.log('not')
  }

  db.query(`INSERT INTO users(name,password)
  VALUES(?,?)`,
    [req.body.name, req.body.password],
    (error, result) => {
      // if (error) return next(new Error(`Unable to register ${error.message}`));
      if (error) { console.log('sqlerror'); };
      // if (!result.insertId) {console.log('sqlerror');}
      // return next(new Error(`Unable to register`));

      const user = {
        username: req.body.name,
        password: req.body.password,
      };
      res.status(201).send(user);
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

  db.query(`select * from users where name = ?`,
    [req.body.name],
    (error, result) => {
      if (error) return next(new Error(`Unable to add user ${error.message}`));
      if (!result) return next(new Error(`Invalid username and password`));
      if (result.password == req.body.password) return next(new Error(`Invalid username and password`))

      res.status(201).send(user);
    });
  req.session.name = req.body.name;
  // req.session.password = req.body.password;
  // console.log(req.session.name, req.session.password);
  res.end();

});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.end();
});

module.exports = router;