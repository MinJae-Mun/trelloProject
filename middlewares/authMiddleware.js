import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const isAuth = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');
    if (!authToken || authType !== 'Bearer') {
        const error = new Error('로그인 후 이용 가능한 기능입니다.');
        error.status = 400;
        throw error;
    }
    try {
        const user = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send('로그인 후 이용 가능한 기능입니다.');
    }
};
