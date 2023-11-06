import axios from 'axios'
const API_URL = 'http://localhost:8080/api/courses'

class CourseService {
  constructor () {
    this.parseToken = () => {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user')).token
      } else {
        return ''
      }
    }
  }

  post (title, description, price) {
    const token = this.parseToken()

    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token
        }
      }
    )
  }

  // 使用學生id，找到學生註冊的課程
  getEnrolledCourses (_id) {
    const token = this.parseToken()

    return axios.get(API_URL + '/student/' + _id, {
      headers: {
        Authorization: token
      }
    })
  }

  // 使用instructor id，來找到講師擁有的課程
  get (_id) {
    const token = this.parseToken()

    return axios.get(API_URL + '/instructor/' + _id, {
      headers: {
        Authorization: token
      }
    })
  }

  getCourseByName (name) {
    const token = this.parseToken()

    return axios.get(API_URL + '/findByName/' + name, {
      headers: {
        Authorization: token
      }
    })
  }

  enroll (_id) {
    const token = this.parseToken()

    return axios.post(
      API_URL + '/enroll/' + _id,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
  }
}

const courseService = new CourseService()
export default courseService
