const jwt = require('jsonwebtoken');

const errors = {
 AUT_01: 'Wrong email or password',
 AUT_02: 'Access denied',
 AUT_03: 'Token has expired. Please login to get a new token',
};

export const authentication = (req, res, next) => {
 const secretKey = process.env.SECRET_KEY;
 const token = req.query['user-key'] || req.headers['user-key'];

 if (token && token.split(' ')[0] === 'Bearer') {
  jwt.verify(token.split(' ')[1], secretKey, (error, user) => {
   if (error) {
    if (error.name === 'TokenExpiredError') {
     res.send({
      error: {
       status: 401,
       code: 'AUT_03',
       message: errors.AUT_03,
       field: 'Token',
      },
     });
    }

    return res.status(401).send({
     error: {
      status: 401,
      code: 'AUT_01',
      message: errors.AUT_01,
      field: 'email/password',
     },
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
    field: 'NoAuth',
   },
  });
 }
};
