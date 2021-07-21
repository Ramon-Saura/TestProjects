import dispatcher from "../../dispatcher"
import axios from 'axios'
import actionTypes from "./action-types"

const ip = {
    casa: '192.168.1.53',
    cala: '192.168.1.49',
    feina: '10.0.8.119',
}

export function loadRooms(){
        return axios.get(`http://${ip.feina}:3000/api/rooms/`).then((list)=>{ 
        dispatcher.dispatch({
                type: actionTypes.ROOM_LIST,
                data: list.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
}