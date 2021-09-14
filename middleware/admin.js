const jwt = require("jsonwebtoken");
const User = require("../models/SignUpModels.js");
const asyncHandler = require('express-async-handler')

const admin = asyncHandler(async (req, res, next) => {
    let token = req.cookies.token;
    toekn = token.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    user_id=decoded.user
    req.user=await User.findById(decoded.user)

    if (req.user.isAdmin) {
        next()
    } else {
        res.status(401)  
        throw new Error('Not authorized as an admin')
    }
})

module.exports = admin
