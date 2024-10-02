const mongo = require('mongoose')

// Kết nối đến MongoDB
const connectMongo = async () => {
  try {
    await mongo.connect('mongodb+srv://lethanhvinhspk:ljlSdShbRvvyyUtJ@mongovinh.jfrn5.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    //console.error('Error connecting to MongoDB', err)
    process.exit(1) // Dừng ứng dụng nếu không thể kết nối
  }
}

module.exports = connectMongo