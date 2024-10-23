import HoiTruong from "../models/hoitruong.js"
import mongoose from 'mongoose'
import connectMongo from "../connMongo.js"

async function findMany() {
  try {
    await connectMongo()
    const halls = await HoiTruong.find()
    return halls
  }
  catch (err) {
    return false
  }
  finally {
    await mongoose.disconnect()
  }
}

async function createHall(hall) {
  try {
    await connectMongo()
    await HoiTruong.create(hall, { runValidators: true })
    return true
  }
  catch (err) {
    return false
  }
  finally {
    await mongoose.disconnect()
  }
}

async function deleteHall(filter) {
  try {
    await connectMongo()
    await HoiTruong.deleteOne(filter)
    return true
  }
  catch (err) {
    return false
  }
  finally {
    await mongoose.disconnect()
  }
}

async function updateHall(filter, newInf) {
  try {
    await connectMongo()
    await HoiTruong.updateOne(filter, newInf, { runValidators: true })
    return true
  }
  catch (err) {
    return false
  }
  finally {
    await mongoose.disconnect()
  }
}
export { findMany, createHall, deleteHall, updateHall }