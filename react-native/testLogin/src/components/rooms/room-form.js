import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Alert} from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import roomStore from '../../store/rooms-store'
import loadRooms from '../../actions/room-actions'
import newRoom from '../../actions/room-actions'

export default function roomForm({navigation}){
    const [rooms, setRooms] =  React.useState(roomStore.getRoomsList())
    
    useEffect(()=>{
        roomStore.addChangeListener(onChange)
        if(rooms.length === 0){
            loadRooms()
        }
        return(roomStore.removeChangeListener(onChange))
    },[rooms.length])

    function onChange(){
        setRooms(roomStore.getRoomsList())
    }

    const [data, setData] = React.useState({
        roomNumber:'',
        address:'',
        check_textInputChange: false,
        check_addressTextInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidRoom: true,
        isValidAddress: true
    })

    const textInputChange = (val) => {
        if(val.trim().length >= 3){
            setData({
                ...data,
                roomNumber: val,
                check_textInputChange: true,
                isValidRoom: true
            })
        }else{
            setData({
                ...data,
                roomNumber: val,
                check_textInputChange: false,
                isValidRoom: false
            })
        }
    }
    const addressTextInputChange = (val) => {
        if(val.trim().length >= 1){
            setData({
                ...data,
                address: val,
                check_addressTextInputChange: true,
                isValidAddress: true
            })
        }else{
            setData({
                ...data,
                address: val,
                check_addressTextInputChange: false,
                isValidAddress: false
            })
        }
    }
    const handleValidRoom = (roomNumber)=>{
        const findRoom = rooms.filter(item =>{
            return roomNumber === item.number
        })
        if(findRoom[0] !== undefined){
            if(data.roomNumber === findRoom[0].number){
                Alert.alert('Invalid Room', 'This room allready exist.',[{text:'OK'}])
                return
            }
        }
    }
    const registerHandle = (roomNumber, address)=>{
        console.log(roomNumber, address)
        if(roomNumber < 3 || address < 1){
            Alert.alert('Wrong Input','Room number or address is incorrect.',[{text: 'OK'}])
            return
        }
        newRoom(roomNumber, address)
    }
 
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register a Room</Text>
            </View>
            <Animatable.View 
                animation='fadeInUpBig'
                style={styles.footer}>
                <Text style={styles.text_footer}>Room number</Text>
                <View style={styles.action}>
                    <FontAwsome
                        name='home'
                        color='#05375a'
                        size={25}
                    />
                    <TextInput
                        placeholder='Room number'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>textInputChange(val)}
                        onEndEditing={(element)=>handleValidRoom(element.nativeEvent.text)}
                    />
                    {data.check_textInputChange?
                    <Animatable.View
                        animation='bounceIn'
                    >
                    <Feather
                        name='check-circle'
                        color='#05c957'
                        size={20}
                    />
                    </Animatable.View>
                    :null}
                </View>
                {data.isValidRoom? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>Room number must be 3 characters long.</Text>
                    </Animatable.View>
                }
                <Text style={[styles.text_footer, {marginTop:35}]}>Address</Text>
                <View style={styles.action}>
                    <FontAwsome
                        name='building-o'
                        color='#05375a'
                        size={25}
                    />
                    <TextInput
                        placeholder='Your address'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>addressTextInputChange(val)}
                    />
                    {data.check_addressTextInputChange?
                    <Animatable.View
                        animation='bounceIn'
                    >
                    <Feather
                        name='check-circle'
                        color='#05c957'
                        size={20}
                    />
                    </Animatable.View>
                    :null}
                </View>
                {data.isValidAddress? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>The addres is wrong</Text>
                    </Animatable.View>
                }
                <View style={styles.button}>
                    <TouchableOpacity 
                        onPress={()=> {registerHandle(data.roomNumber, data.address)}}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Register</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    header:{
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer:{
        flex: 3,
        backgroundColor: '#33d5ff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#33d5ff',
        fontWeight: 'bold',
        fontSize: 35
    },
    text_footer: {
        color: '#fff',
        fontSize: 25,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor:'#33d5ff',
        paddingBottom: 5
    },
    errorMsg:{
        fontSize: 14,
        color: '#e92f0e'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        fontSize:18,
        paddingLeft: 20,
        color: '#fff'
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#33d5ff'
    }
})