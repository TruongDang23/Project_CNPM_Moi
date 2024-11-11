// this is the controller for the authentication routes
import taikhoan from '../models/taikhoan.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import Email from '../utils/email.js'

import KhachHang from '../models/khachhang.js'
import khachHangController from './khachHangController.js'

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const maTK = user.MaTK
  // Remove password from output
  user.Pass = undefined
  res.status(statusCode).json({
    token,
    maTK
  })
}

const signup = catchAsync(async (req, res, next) => {
  const data = req.body

  // lấy số lượng tài khoản hiện có để sinh mã mới
  const taikhoanCount = await taikhoan.countDocuments()

  // Tạo mã MaTK theo định dạng nếu role là admin thì là "Axxx", nếu là user thì là "Uxxx"
  let newMaTK
  if (data.role === 'admin') {
    newMaTK = `A${String(taikhoanCount + 1).padStart(3, '0')}`
  } else {
    newMaTK = `U${String(taikhoanCount + 1).padStart(3, '0')}`
  }

  const newUser = await taikhoan.create({
    MaTK: newMaTK, // Mã tự động sinh
    UserName: data.username,
    Pass: data.pass,
    Role: data.role
  })

  // Tạo thông tin khách hàng tương ứng với tài khoản mới
  const newKhachHang = await KhachHang.create({
    MaTK: newMaTK,
    HoTen: data.username
  })

  if (!newUser || !newKhachHang) {
    return next(new AppError('Không thể tạo tài khoản', 400))
  }

  createSendToken(newUser, 201, res)
})

const login = catchAsync(async (req, res, next) => {
  const { username, pass } = req.body
  // 1) Check if email and password exist
  if (!username || !pass) {
    return next(new AppError('Please provide username and password!', 400))
  }

  // 2) Check if user exists && password is correct
  const user = await taikhoan
    .findOne({ UserName: username })
    .select('+Pass +MaTK')

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

const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString('hex') // Tạo mật khẩu ngẫu nhiên dài 16 ký tự
}

const resetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body
  const user = await taikhoan.findOne({ Email: email })

  if (!user) {
    return next(new AppError('Không tìm thấy người dùng với email này', 404))
  }

  const newPassword = generateRandomPassword()
  user.Pass = newPassword
  await user.save()

  const emailInstance = new Email(user, `${req.protocol}://${req.get('host')}/login`)
  await emailInstance.sendNewPassword(newPassword)

  res.status(200).json({
    status: 'success',
    message: 'Mật khẩu mới đã được gửi đến email của bạn'
  })
})


export default { login, signup, protect, restrictTo }
