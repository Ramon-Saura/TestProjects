import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, TextInput } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../context'
import Users from '../../../mock.users'

export default function Login({navigation}){

    const [data, setData] = React.useState({
        userName:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true
    })

    const { signIn } = React.useContext( AuthContext )

    const textInputChange = (val) => {
        if(val.trim().length >= 4){
            setData({
                ...data,
                userName: val,
                check_textInputChange: true,
                isValidUser: true
            })
        }else{
            setData({
                ...data,
                userName: val,
                check_textInputChange: false,
                isValidUser: false
            })
        }
    }

    const  handlePasswordChange = (val)=>{
        if(val.trim().length >= 8){
            setData({
                ... data,
                password: val,
                isValidPassword: true
            })    
        }else{
            setData({
                ... data,
                password: val,
                isValidPassword: false
            })
        }        
    }

    const updateSecureTextEntry = ()=>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const loginHandle = (userName, password) => {
        const foundUser = Users.filter(item => {
            return userName === item.username && password === item.password
        })
        if(data.userName.length === 0 || data.password.length === 0){
            Alert.alert('Wrong Input','Username or password field cannot be empty',[{text:'OK'}])
            return
        }
        if( foundUser.length === 0){
            Alert.alert('Invalid User', 'Username or password is incorrect.',[{text: 'OK'}])
            return;
        }
        signIn(foundUser)
    }
    
    const handleValidUser = (val)=>{
        if(val.trim().length >= 4 ){
            setData({
                ...data,
                isValidUser: true
            })
        }else{
            setData({
                ...data,
                isValidUser: false
            })
        }
    }
 
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign In!</Text>
            </View>
            <Animatable.View 
                animation='fadeInUpBig'
                style={styles.footer}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <FontAwsome
                        name='user-o'
                        color='#05375a'
                        size={25}
                    />
                    <TextInput
                        placeholder='Your Username'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>textInputChange(val)}
                        onEndEditing={(element)=>handleValidUser(element.nativeEvent.text)}
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
                {data.isValidUser? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }
                <Text style={[styles.text_footer, {marginTop:35}]}>Password</Text>
                <View style={styles.action}>
                    <FontAwsome
                        name='lock'
                        color='#05375a'
                        size={25}
                    />
                    <TextInput
                        placeholder='Your Password'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry?
                            <Feather
                                name='eye-off'
                                color='#05375a'
                                size={20}
                            />
                            :
                            <Feather
                                name='eye'
                                color='#05375a'
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }
                <View style={styles.button}>
                    <TouchableOpacity 
                        onPress={() => {loginHandle(data.userName, data.password)}}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.button,{marginTop: 30}]}>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('Register')}
                        style={[styles.signIn,{backgroundColor:'transparent', borderWidth: 1}]}>
                        <Text style={[styles.textSign,{color:'#030504'}]}>Sign Up</Text>
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
        flex: 1,
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
    },
    errorMsg:{
        fontSize: 14,
        color: '#e92f0e'
    }
})