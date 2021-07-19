const express = require('express')
const roomController = require('../controllers/room-controller')

const roomRouter = express.Router()

function routes(){
    const controller = roomController()
    roomRouter.route("/").get(controller.getList)
    roomRouter.route("/:username").get(controller.get)
    roomRouter.route("/add").post(controller.post)
    roomRouter.route("/update/:id").put(controller.put)
    roomRouter.route("/:id").delete(controller.deleteUser)
    return userRouter
}

module.exports = routes