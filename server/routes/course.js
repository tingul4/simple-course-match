const router = require('express').Router()
const { Course } = require('../models')
const { courseValidation } = require('../validation')

router.use((req, res, next) => {
  console.log('course route正在接受一個request...')
  next()
})

// 獲得系統中的所有課程
router.get('/', async (req, res) => {
  try {
    const courseFound = await Course.find({})
      .populate('instructor', ['username', 'email'])
      .exec()
    return res.send(courseFound)
  } catch (e) {
    return res.status(5000).send(e)
  }
})

// 用課程id尋找課程
router.get('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const courseFound = await Course.findOne({ _id })
      .populate('instructor', ['email'])
      .exec()
    return res.send(courseFound)
  } catch (e) {
    return res.status(500).send(e)
  }
})

// 新增課程
router.post('/', async (req, res) => {
  // 驗證數據符合規範
  const { error } = courseValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  if (req.user.isStudent()) {
    return res
      .status(400)
      .send('只有講師才能發佈新課程。若你已經是講師，請透過講師帳號登入。')
  }

  const { title, description, price } = req.body
  try {
    const newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id
    })
    await newCourse.save()
    return res.send('新課程已經保存')
  } catch (e) {
    return res.status(500).send('無法創建課程。。。')
  }
})

// 更改課程
router.patch('/:_id', async (req, res) => {
  // 驗證數據符合規範
  const { error } = courseValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { _id } = req.params
  // 確認課程存在
  try {
    const courseFound = await Course.findOne({ _id })
    if (!courseFound) {
      return res.status(400).send('找不到課程。無法更新課程內容。')
    }

    // 使用者必須是此課程講師，才能編輯課程
    if (courseFound.instructor.equals(req.user._id)) {
      const updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true
      })
      return res.send({
        message: '課程已經被更新成功',
        updatedCourse
      })
    } else {
      return res.status(403).send('只有此課程的講師才能編輯課程。')
    }
  } catch (e) {
    return res.status(500).send(e)
  }
})

// 刪除課程
router.delete('/:_id', async (req, res) => {
  const { _id } = req.params
  // 確認課程存在
  try {
    const courseFound = await Course.findOne({ _id }).exec()
    if (!courseFound) {
      return res.status(400).send('找不到課程。無法刪除課程。')
    }

    // 使用者必須是此課程講師，才能刪除課程
    if (courseFound.instructor.equals(req.user._id)) {
      await Course.deleteOne({ _id }).exec()
      return res.send('課程已被刪除。')
    } else {
      return res.status(403).send('只有此課程的講師才能刪除課程。')
    }
  } catch (e) {
    return res.status(500).send(e)
  }
})

// 用講師id來尋找課程
router.get('/instructor/:instructorId', async (req, res) => {
  const { instructorId } = req.params
  const coursesFound = await Course.find({ instructor: instructorId })
    .populate('instructor', ['username', 'email'])
    .exec()
  return res.send(coursesFound)
})

// 用學生id來尋找註冊過的課程
router.get('/student/:studentId', async (req, res) => {
  const { studentId } = req.params
  const coursesFound = await Course.find({ student: studentId })
    .populate('instructor', ['username', 'email'])
    .exec()
  return res.send(coursesFound)
})

// 用課程名稱尋找課程
router.get('/findByName/:name', async (req, res) => {
  const { name } = req.params
  try {
    // const courseFound = await Course.find({ $where: () => this.filter(e => e.title.toLowerCase().includes(name.toLowerCase())) })
    const courseFound = await Course.find({ title: new RegExp(name, 'i') })
      .populate('instructor', ['email', 'username'])
      .exec()
    return res.send(courseFound)
  } catch (e) {
    return res.status(500).send(e)
  }
})

// 讓學生透過課程id來註冊新課程
router.post('/enroll/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const course = await Course.findOne({ _id }).exec()
    course.student.push(req.user._id)
    await course.save()
    return res.send('註冊完成')
  } catch (e) {
    return res.send(e)
  }
})

module.exports = router
