module.exports = async (req, res, next) => {
    console.log('2', req.session.user)
    if (req.session.user) {
        next();
    } else {
        res.status(401).end();
    }
};