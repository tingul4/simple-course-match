import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseService from '../services/course.service';

const CourseComponent = (props) => {
  let { currentUser } = props;
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [courseData, setCourseData] = useState(null)
  useEffect(() => {
    let _id
    if (currentUser) {
      _id = currentUser.user._id
      if (currentUser.user.role === 'instructor') {
        CourseService.get(_id)
          .then(res => setCourseData(res.data))
          .catch(e => console.log(e))
      }
      if (currentUser.user.role === 'student') {
        CourseService.getEnrolledCourses(_id)
          .then(res => setCourseData(res.data))
          .catch(e => console.log(e))
      }
    }
  }, [currentUser])

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' &&
        <div>
          <h1>歡迎來到講師的課程頁面</h1>
        </div>
      }
      {currentUser && currentUser.user.role === 'student' &&
        <div>
          <h1>歡迎來到學生的課程頁面</h1>
        </div>
      }
      {currentUser && courseData && courseData.length !== 0 && 
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {courseData.map(course => 
            <div className='card' style={{width: '18rem', margin: '1rem'}}>
              <div className='card-body'>
                <h5 className='card-title mx-1 '>課程名稱: {course.title}</h5>
                <p className='card-text m-1'>介紹: {course.description}</p>
                <p className='card-text m-1'>學生人數: {course.student.length}</p>
                <p className='card-text m-1'>課程價格: {course.price}</p>
                <p className='card-text m-1'>講師: {course.instructor.username}</p>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default CourseComponent
