const express = require("express");
// const User = require('../index.js')
const User = require('../model/user.js')
const router = express.Router();
const apiController = require("../controllers/apiRouteControllers.js")


router.get('/users', async (req, res) => {
    const users = await User.find({})
    res.send(users)
})
router.post('/users', apiController.creatUser)

router.route("/users/:id")
    .get(apiController.getUser)
    .delete(apiController.deleteUser)
    .patch(apiController.updateUser)


module.exports = router; 