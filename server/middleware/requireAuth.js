const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const requireAuth = async (req, res, next) => {
    try {
        // read token off cookies
        const token = req.cookies.Authorization;

        // decode the token
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);

        // check expiration of token
        if (Date.now() > decodedToken.expirationTime) {
            return res.status(401).send('Token expired');
        }

        // find user using decoded sub
        const user = await User.findById(decodedToken.sub);

        if (!user) {
            return res.status(401).send('User not found');
        }

        // attach user to req
        req.user = user;

        // continue on
        next();
    } catch (error) {
        // handle JWT verification or other errors
        console.error('Error in requireAuth middleware:', error);

        // Provide a more general error message for security reasons
        return res.status(401).send('Unauthorized');
    }
};

module.exports = requireAuth;
