const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'test'
})

function userController(){
    function getList(req, res){
        const sql = 'SELECT * FROM rooms'
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
        const { id } = req.params
        const sql = `SELECT * FROM rooms WHERE id = '${id}'`
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
        const sql = 'INSERT INTO rooms SET ?'

        const newRoom = {
            state: 'libre-limpio',
            number: req.body.number,
            address: req.body.address
        }

        connection.query(sql, newRoom, error =>{
            if (error) throw error
            res.json(newRoom)
        })
    }
    function put(req, res){
        const { id } = req.params
        const { state, number, address } = req.body
        const sql = `UPDATE rooms SET state = '${state}', number = '${number}', address = '${address}' WHERE id = ${id}`

        connection.query(sql, (error, result) =>{
            if(error) throw error
                res.send('Room updated!')
        })
    }
    function deleteRoom(req, res){
        const {id} = req.params
        const sql = `DELETE FROM rooms WHERE id = ${id}`

        connection.query(sql, (error, result) =>{
            if(error) throw error
                res.send('Room deleted!')  
        })
    }
    return {get, post, put, deleteRoom, getList}
}

module.exports = userController