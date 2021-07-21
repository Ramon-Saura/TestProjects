import EventEmitter from 'events'
import dispatcher from '../../dispatcher'
import actionTypes from '../actions/action-types'

const CHANGE_EVENT = 'change'

let _rooms = []

class RoomStore extends EventEmitter{
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback)
    }
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback)
    }
    emitChange(){
        this.emit(CHANGE_EVENT)
    }
    getRoomsList(){
        return _rooms
    }
}

const roomStore = new RoomStore()
dispatcher.register((action)=>{
    switch (action.type){
        case actionTypes.ROOM_LIST:
            _rooms = action.data
            roomStore.emitChange()
        break
    }
})

export default roomStore