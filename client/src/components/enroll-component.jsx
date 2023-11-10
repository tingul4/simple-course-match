import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseService from '../services/course.service'

const EnrollComponent = props => {
  const { currentUser } = props
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const handleTakeToLogin = () => {
    navigate('/login')
  }
  const handleChangeInput = e => {
    setSearchInput(e.target.value)
  }
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then(res => {
        setSearchResult(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleEnroll = e => {
    CourseService.enroll(e.target.id)
      .then(() => {
        window.alert('課程註冊成功。重新導向到課程頁面。')
        navigate('/course')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div>
          <p>我們從 API 返回的數據。</p>
          {searchResult.map(course => (
            <div key={course._id} className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">課程名稱：{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>價格: {course.price}</p>
                <p>目前的學生人數: {course.student.length}</p>
                <p>講師: {course.instructor.username}</p>
                <button
                  onClick={handleEnroll}
                  className="card-text btn btn-primary"
                  id={course._id}
                >
                  註冊課程
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrollComponent