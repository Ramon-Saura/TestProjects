import dispatcher from "../../dispatcher"
import axios from 'axios'
import actionTypes from "./action-types"

export function loadUsers(){
    /* 10.0.4.176   aguamarina*/
    /* 192.168.1.49 cala */
    return axios.get(`http://10.0.4.176:3000/api/users/`).then((list)=>{ 
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
    return axios.post(`http://10.0.4.176:3000/api/users/add`, {
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