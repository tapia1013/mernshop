import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


// @description     Auth user & get token
// @route           POST /api/users/login
// @access          Public
const authUser = asyncHandler(async (req, res) => {
  // gives us data of body from form login
  const { email, password } = req.body

  // res.send({
  //   name,
  //   email,
  //   password
  // })

  const user = await User.findOne({ email })

  // tries to match plain text to encrypted pw with method we made in User Model Schema
  if (user && (await user.matchPassword(password))) {
    // return all the following from DB if pw match
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    })
  } else {
    // Unauthorized
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export { authUser }