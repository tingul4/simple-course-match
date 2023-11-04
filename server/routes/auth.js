const router = require('express').Router()
const { User } = require('../models')
const { registerValidation, loginValidation } = require('../validation')
const jwt = require("jsonwebtoken");

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
    const savedUser = await newUser.save()
    return res.send({
      msg: "使用者成功儲存。",
      savedUser,
    })
  } catch (error) {
    return res.status(500).send("無法儲存使用者。。。")
  }

})

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { email, password } = req.body
  const foundUser = await User.findOne({ email })
  if (!foundUser) return res.status(400).send('無此使用者')
  foundUser.comparePassword(password, (error, isMatch) => {
    if (error) return res.status(500).send(error)

    if (isMatch) {
      const tokenObject = { _id: foundUser._id, email: foundUser.email }
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET)
      return res.send({
        message: '成功登入',
        token: 'JWT ' + token,
        user: foundUser
      })
    } else {
      return res.status(401).send('密碼錯誤')
    }
  })
})

module.exports = router
