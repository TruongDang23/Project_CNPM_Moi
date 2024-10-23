import TaiKhoan from "../models/taikhoan.js"
import mongoose from 'mongoose'
import connectMongo from "../connMongo.js"

async function findOne(filter) {
  try {
    await connectMongo()
    const account = await TaiKhoan.findOne(filter)
    return (account != null) ? account.MaTK : 'not found'
  }
  catch (err) {
    return false
  }
  finally {
    await mongoose.disconnect()
  }
}

export { findOne }