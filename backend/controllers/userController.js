import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
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
      token: generateToken(user._id)
    })
  } else {
    // Unauthorized
    res.status(401)
    throw new Error('Invalid email or password')
  }
})




// @description     Register a new user
// @route           POST /api/users
// @access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    // 201 = something was created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



// @description     Get user profile
// @route           GET /api/users/profile
// @access          Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



// @description     Update user profile
// @route           PUT /api/users/profile
// @access          Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // req.body is being sent from the form inputs
  if (user) {
    // Update profile info with form body data or default
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    // check if password is sent
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



export { authUser, registerUser, getUserProfile, updateUserProfile }