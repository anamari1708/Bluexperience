const jwt = require("jsonwebtoken");

function checkauth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) 
      return res.status(401).json({ errorMessage: "You need to be logged in!" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user; //read the id in the request

    next();
  } 
  
  catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = checkauth;