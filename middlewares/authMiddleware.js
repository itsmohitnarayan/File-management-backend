const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized access' });
    req.user = decoded;
    next();
  });
};
