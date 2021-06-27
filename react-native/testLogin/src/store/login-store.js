import EventEmitter from 'events'
import dispatcher from '../../dispatcher'
import actionTypes from '../actions/action-types'

const CHANGE_EVENT = 'change'

let _users = []

class LoginStore extends EventEmitter{
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback)
    }
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback)
    }
    emitChange(){
        this.emit(CHANGE_EVENT)
    }
    getUsersList(){
        return _users
    }
}

const loginStore = new LoginStore()
dispatcher.register((action)=>{
    switch (action.type){
        case actionTypes.USERS_LIST:
            _users = action.data
            loginStore.emitChange()
        break
        case actionTypes.CREATE_USER:
            _users = [
                ...users,
                {...action.data}
            ]
            loginStore.emitChange()
        break
    }
})

export default loginStore