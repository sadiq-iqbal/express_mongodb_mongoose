const express = require("express");
// const User = require('../index.js')
const User = require('../model/user.js')
const path = require("node:path");
const router = express.Router();


router.get('/', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
    }
    catch (err) {
        throw new Error(err)
    }
})

router.get("/users", async (req, res) => {
    const users = await User.find({})
    const html = `
    <ul>
        ${users.map(user => `<li>${user.firstName} ${user.lastName} , ${user.email} , ${user.jobTitle}</li>`)}
    </ul>
    `
    res.send(html)

})

const rootRouter = router
module.exports = rootRouter