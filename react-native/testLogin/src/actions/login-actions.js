import dispatcher from "../../dispatcher"
import axios from 'axios'
import actionTypes from "./action-types"

const ip = {
    casa: '192.168.1.53',
    cala: '192.168.1.49',
    feina: '10.0.4.176',
}

export function loadUsers(){
        return axios.get(`http://${ip.casa}:3000/api/users/`).then((list)=>{ 
        dispatcher.dispatch({
                type: actionTypes.USERS_LIST,
                data: list.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
}

export default function newUser(userName, userDepartment, userPassword, userToken){
    return axios.post(`http://${ip.casa}:3000/api/users/add`, {
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

export function loadUser(username){
    return axios.get(`http//${ip.casa}:3000/api/users/${username}`).then((user)=>{
        dispatcher.dispatch({
            type: actionTypes.GET_USER,
            data: user.data
        })
    })
}