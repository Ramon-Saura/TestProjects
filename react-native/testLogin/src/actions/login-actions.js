import dispatcher from "../../dispatcher"
import axios from 'axios'
import actionTypes from "./action-types"

export function loadUser(userName){
    return axios
        .get(`/api/user/${userName}`)
        .then((user)=>{
            dispatcher.dispatch({
                type: actionTypes.LOGIN,
                data: user.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
}