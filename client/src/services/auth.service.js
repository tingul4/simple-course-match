import axios from 'axios'
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://simple-course-match-malyixlpwq-de.a.run.app/api/user'
  : 'http://localhost:8080/api/user'

class AuthService {
  login (email, password) {
    return axios.post(API_URL + '/login', { email, password })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (username, email, password, role) {
    return axios.post(API_URL + '/register', {
      username,
      email,
      password,
      role
    })
  }

  getCurrentUser () {
    return JSON.parse(localStorage.getItem('user'))
  }
}

const authService = new AuthService()
export default authService
