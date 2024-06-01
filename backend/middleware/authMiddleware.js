import jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next)=>{
    let token;

    token= await req.cookies.jwt;

    if (token) {
        try{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decodedToken.userId).select('-password');

            next();
        }catch(err) {
            res.status(401);
            throw new Error('Not authorized, Token failed to be verified')
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no Token')
    }
});


const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as Admin')
    }
}

export { admin, protect};