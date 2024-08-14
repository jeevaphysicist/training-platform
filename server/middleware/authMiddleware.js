const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1]; 
  // console.log("token",token);
  if (token == null) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, 'ihhoh88h8h8h8h', (err, user) => {
    if (err) return res.status(403).json({ error: 'Your Not Authorized' });
    req.user = user; 
    next();
  });
};

module.exports = authenticateToken;
