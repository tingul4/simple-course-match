const router = require('express').Router()
const { User, Course } = require('../models')
const { registerValidation, loginValidation, courseValidation } = require('../validation')

router.use((req, res, next) => {
  console.log('這是一個 auth 請求...')
  next()
})

router.get('/testApi', (req, res) => {
  return res.send("成功連結 auth route...")
})

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { username, email, password, role } = req.body
  const emailExist = await User.findOne({ email })
  if (emailExist) return res.status(400).send("此信箱已經被註冊過了。。。")
  const newUser = new User({ username, email, password, role })
  try {
    const savedUser = newUser.save()
    return res.send({
      msg: "使用者成功儲存。",
      savedUser,
    })
  } catch (error) {
    return res.status(500).send("無法儲存使用者。。。")
  }

})

module.exports = router
