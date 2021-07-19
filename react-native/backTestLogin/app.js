const express = require('express')

const port = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const userRouter = require('./routes/user-router')()
app.use('/api/users', userRouter)

const roomRouter = require('./routes/room-router')()
app.use('/api/rooms', roomRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}!`)
})