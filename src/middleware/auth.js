const jwt = require ('jsonwebtoken');

export const authentication = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.query['user-key'] || req.headers['user-key'];

  if (token && token.split (' ')[0] === 'Bearer') {
    jwt.verify (token.split (' ')[1], secretKey, (error, user) => {
      if (error) {
        return res.status (401).send (error);
      } else {
        req['user'] = user;
        return next ();
      }
    });
  } else {
    return res.status (401).send ({
      message: 'Provide authorization bearer token named USER-KEY',
    });
  }
};
