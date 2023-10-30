const router = require('express').Router()
const { Course } = require('../models')
const { courseValidation } = require('../validation')

router.use((req, res, next) => {
  console.log("course route正在接受一個request...");
  next();
});

router.post("/", async (req, res) => {
  // 驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isStudent()) {
    return res
      .status(400)
      .send("只有講師才能發佈新課程。若你已經是講師，請透過講師帳號登入。");
  }

  let { title, description, price } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send("新課程已經保存");
  } catch (e) {
    return res.status(500).send("無法創建課程。。。");
  }
});

module.exports = router