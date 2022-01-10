const jwt = require('jsonwebtoken')
const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        const { email, _id } = decoded;
        req.email = email;
        req._id = _id
        next()
    } catch (err) {
        next("Authentication failure")
    }
}
module.exports = checkLogin