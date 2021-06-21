const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'test'
})

function userController(){
    function getList(req, res){
        const sql = 'SELECT * FROM users'
        connection.query(sql,(error, result)=>{
            if(error)throw error
            if(result.length > 0){
                res.json(result)
            }else{
                res.send('Not result')
            }
        })
    }
    function get(req, res){
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
    }
    function post(req, res){
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
    }
    function put(req, res){
        const { id } = req.params
        const { username, password, token, department } = req.body
        const sql = `UPDATE users SET username = '${username}', password = '${password}', token = '${token}', department = '${department}' WHERE id = '${id}'`

        connection.query(sql, (error, result) =>{
            if(error) throw error
                res.send('User updated!')  
        })
    }
    function deleteUser(req, res){
        const {id} = req.params
        const sql = `DELETE FROM users WHERE id = '${id}'`

        connection.query(sql, (error, result) =>{
            if(error) throw error
                res.send('User deleted!')  
        })
    }
    return {get, post, put, deleteUser, getList}
}

module.exports = userController