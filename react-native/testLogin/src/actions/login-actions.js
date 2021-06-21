import dispatcher from "../../dispatcher"
import axios from 'axios'
import actionTypes from "./action-types"

export function loadUsers(){
    console.log('I am in actions')
    return axios.get(`/api/users/`).then((list)=>{
            console.log('then' + list)
            dispatcher.dispatch({
                type: actionTypes.USERS_LIST,
                data: list.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
}