import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseService from '../services/course.service'

const PostCourseComponent = props => {
  const { currentUser } = props
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  // 當未登入時重新導向
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  })
  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }
  const handleChangeDesciption = e => {
    setDescription(e.target.value)
  }
  const handleChangePrice = e => {
    setPrice(e.target.value)
  }
  const postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        window.alert('新課程已創建成功')
        navigate('/course')
      })
      .catch(error => {
        console.log(error.response)
        setMessage(error.response.data)
      })
  }

  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <h3>只有講師可以發布新課程。</h3>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div className="form-group">
          <label htmlFor="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />
          <br />
          <label htmlFor="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
          />
          <br />
          <label htmlFor="exampleforPrice">價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            交出表單
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCourseComponent
