// this is the controller for the authentication routes
import taikhoan from '../models/taikhoan.js'
import catchAsync from '../utils/catchAsync.js'

const login = catchAsync(async (req, res, next) => {
  const data = req.body
  try {
    const result = await taikhoan.find({
      UserName: data.username,
      Pass: data.pass
    })
    if (result.length != 0) res.send(result[0].MaTK)
    else res.send('not found')
  } catch (err) {
    res.send('error')
  }
})

export default { login }
