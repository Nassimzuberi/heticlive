var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'fjeijfejfejngjnnsjdnjdnndlqldvdjnvhbq38484';

//exported functions
module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
                userId: userData.id,
            },
            JWT_SIGN_SECRET)
    }
}