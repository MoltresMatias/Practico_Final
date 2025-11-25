const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.useData = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            'message': "invalido o expiro el token",
            'error': e
        })
    }
}


module.exports = {
    checkAuth: checkAuth
}