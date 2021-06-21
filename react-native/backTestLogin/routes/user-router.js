const express = require('express')
const userController = require('../controllers/user-controller')

const userRouter = express.Router()

function routes(){
    const controller = userController()
    userRouter.route("/").get(controller.getList)
    userRouter.route("/:username").get(controller.get)
    userRouter.route("/add").post(controller.post)
    userRouter.route("/update/:id").put(controller.put)
    userRouter.route("/:id").delete(controller.deleteUser)
    return userRouter
}

module.exports = routes