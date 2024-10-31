// this is the controller for the authentication routes
import taikhoan from '../models/taikhoan.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

//

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  // Remove password from output
  user.Pass = undefined
  res.status(statusCode).json({
    token
  })
}

const signup = catchAsync(async (req, res, next) => {
  const data = req.body

  const newUser = await taikhoan.create({
    MaTK: data.matk,
    UserName: data.username,
    Pass: data.pass,
    Role: data.role
  })
  createSendToken(newUser, 201, res)
})

const login = catchAsync(async (req, res, next) => {
  const { username, pass } = req.body
  // 1) Check if email and password exist
  if (!username || !pass) {
    return next(new AppError('Please provide username and password!', 400))
  }

  // 2) Check if user exists && password is correct
  const user = await taikhoan.findOne({ UserName: username }).select('+Pass')

  if (!user || !(await user.correctPassword(pass, user.Pass))) {
    return next(new AppError('Incorrect username or password', 401))
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res)
})

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentUser = await taikhoan.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }

  req.user = currentUser
  next()
})

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.Role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}

export default { login, signup, protect, restrictTo }
