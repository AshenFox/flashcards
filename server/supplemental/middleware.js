const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  // Get token fron headers
  const header = req.header('Authorization');
  const token = header && header.split(' ')[1];

  if (!header || !token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = { server_id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Tokenis not valid' });
  }
};

module.exports = { auth };
