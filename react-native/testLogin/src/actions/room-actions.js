import dispatcher from "../../dispatcher"
import axios from 'axios'
import actionTypes from "./action-types"
import roomStore from "../store/rooms-store"
import { color } from "react-native-reanimated"

const ip = {
    casa: '192.168.1.53',
    cala: '192.168.1.49',
    feina: '10.0.10.202',
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
export default function newRoom(roomNumber, address){
    return axios.post(`http://${ip.feina}:3000/api/rooms/add`,{
        number: roomNumber,
        address: address
    }).then(response =>{
        dispatcher.dispatch({
            type: actionTypes.CREATE_ROOM,
            data: response.data
        })
    }).catch(error=>{console.log(error)})
}