const jwt = require ('jsonwebtoken');

export const authentication = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.body.token || req.query.token || req.headers.authorization;

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
    return res
      .status (401)
      .send ({message: 'Missing authorization bearer token'});
  }
};
