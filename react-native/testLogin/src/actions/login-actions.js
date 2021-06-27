import dispatcher from "../../dispatcher"
import axios from 'axios'
import actionTypes from "./action-types"

export function loadUsers(){
    return axios.get(`http://192.168.1.53:3000/api/users/`).then((list)=>{ 
        dispatcher.dispatch({
                type: actionTypes.USERS_LIST,
                data: list.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
}
export function newUser(userName, userDepartment, userPassword, userToken){
    return axios.post(`http://192.168.1.53:3000/api/users/add`, {
        username: userName,
        department: userDepartment,
        password: userPassword,
        token: userToken
    }).then(response =>{
        dispatcher.dispatch({
            type: actionTypes.CREATE_USER,
            data: response.data
        })
    }).catch(error=>{console.log(error)})
}