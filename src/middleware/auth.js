const jwt = require('jsonwebtoken');

const errors = {
  AUT_01: 'Wrong email or password',
  AUT_02: 'Access denied'
};

export const authentication = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.query['user-key'] || req.headers['user-key'];

  if (token && token.split(' ')[0] === 'Bearer') {
    jwt.verify(token.split(' ')[1], secretKey, (error, user) => {
      if (error) {
        return res.status(401).send({
          error: {
            status: 401,
            code: 'AUT_01',
            message: errors.AUT_01,
            field: 'email/password'
          }
        });
      } else {
        req['user'] = user;
        return next();
      }
    });
  } else {
    return res.status(401).send({
      error: {
        status: 401,
        code: 'AUT_02',
        message: errors.AUT_02,
        field: 'NoAuth'
      }
    });
  }
};
