import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || '123456789';
const authenticationToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(404).json({ error: 'Token not found' });
    }
    try {
        const decode = jwt.verify(token, jwtSecret);
        req.userData = { ...decode };
        next();
    }
    catch (err) {
        return res.status(403).json({ error: 'Token expired.' });
    }
};
export default authenticationToken;
//# sourceMappingURL=authMiddleware.js.map