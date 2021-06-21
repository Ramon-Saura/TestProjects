const express = require('express')

const port = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const userRouter = require('./routes/user-router')()
app.use('/api/users', userRouter)


/* app.get('/',(req, res)=>{
    res.send('Hello word!')
})
app.get('/list',(req, res)=>{
    const sql = 'SELECT * FROM users'
    connection.query(sql,(error, result)=>{
        if(error)throw error
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('Not result')
        }
    })
})
app.get('/list/:username',(req, res)=>{
    const { username } = req.params
    const sql = `SELECT * FROM users WHERE username = '${username}'`
    connection.query(sql, (error, result)=>{
        if(error)throw error
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('Not result')
        }
    })
})
app.post('/add',(req, res)=>{
    const sql = 'INSERT INTO users SET ?'

    const userObj = {
        username: req.body.username,
        password: req.body.password,
        token: req.body.token,
        department: req.body.department
    }

    connection.query(sql, userObj, error =>{
        if (error) throw error
        res.send('User created!')
    })
})
app.put('/update/:id',(req, res)=>{
    const { id } = req.params
    const { username, password, token, department } = req.body
    const sql = `UPDATE users SET username = '${username}', password = '${password}', token = '${token}', department = '${department}' WHERE id = '${id}'`

    connection.query(sql, (error, result) =>{
        if(error) throw error
            res.send('User updated!')  
    })

})
app.delete('/delete/:id',(req, res)=>{
    const {id} = req.params
    const sql = `DELETE FROM users WHERE id = '${id}'`

    connection.query(sql, (error, result) =>{
        if(error) throw error
            res.send('User deleted!')  
    })

}) */
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}!`)
})