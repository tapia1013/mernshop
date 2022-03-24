import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // token will be sent is through headers Bearer ${token}
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // console.log('token found but not passed yet');
    try {
      token = req.headers.authorization.split(' ')[1]

      // decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);

      // we can get the users id now with decoded.id in UserSchema
      req.user = await User.findById(decoded.id).select('-password')

      next();
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }

})

export { protect }