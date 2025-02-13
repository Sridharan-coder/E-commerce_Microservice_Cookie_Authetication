const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    console.log("Cookies------------>",req.cookies.s_token)
    const token=req.cookies.s_token;
    // const authHeader = req.headers.authorization;
    const s_id = req.params["s_id"];
    if (!token) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT);
        if (user.sub !== s_id) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized!',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Authentication Error --> ", error)
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
    }
};