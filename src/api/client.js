import axios from 'axios'
const path = 'http://localhost:3000'
export default class APIClient {
  // Constructor để khởi tạo thuộc tính
  constructor(object) {
    this.object = object
    this.api = `${path}/api/${object}` // http://localhost:3000/api/system/login
    this.token = sessionStorage.getItem('userAuth')
  }

  async authenticate(account) {
    try {
      const data = await axios.post(`${this.api}/login`, {
        username: account.username,
        pass: account.pass
      })
      return data
    } catch (error) {
      return error
    }
  }

  async reauthenticate() {}

  async find() {
    try {
      const data = await axios.get(`${this.api}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      return data
    } catch (error) {
      return error
    }
  }

  async findByID(id) {
    const data = await axios.get(`${this.api}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    return data
  }

  async create(newData) {
    const data = await axios.post(`${this.api}`, newData, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    return data // data = true/false
  }

  async update(id, newData) {
    const data = await axios.patch(`${this.api}/${id}`, newData, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    return data
  }

  async delete(id) {
    const data = await axios.delete(`${this.api}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    return data
  }
}
