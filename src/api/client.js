import axios from 'axios'
const path = 'http://localhost:3000'
import { useSearchParams } from 'react-router-dom'

export default class APIClient {
  // Constructor để khởi tạo thuộc tính
  constructor(object) {
    this.object = object
    this.api = `${path}/api/${object}` // http://localhost:3000/api/system/login
  }

  async authenticate(account) {
    try {
      const data = await axios.post(`${this.api}/login`, {
        username: account.username,
        pass: account.pass
      })
      return data
    }
    catch (error) {
      return error
    }
  }

  async reauthenticate() {

  }

  async find() {
    const token = sessionStorage.getItem('userAuth')
    console.log(token)
    const data = await axios.get(`${this.api}/`, { })
    return data
  }

  async findByID(id) {
    const data = await axios.get(`${this.api}/:${id}`, { })
    return data
  }

  async create() {
    const data = await axios.post(`${this.api}/`, { })
    return data // data = true/false
  }

  async update(id) {
    const data = await axios.patch(`${this.api}/${id}`, { })
    return data // data = true/false
  }

  async delete(id) {
    const data = await axios.delete(`${this.api}/:${id}`, { })
    return data // data = true/false
  }
}


