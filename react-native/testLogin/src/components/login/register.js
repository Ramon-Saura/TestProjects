import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Alert} from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../context'

export default function Register({navigation}){
    const [users, setUsers] =  React.useState(loginStore.getUsersList())
    console.log(users[0])
    useEffect(()=>{
        loginStore.addChangeListener(onChange)
        if(users.length === 0){
            loadUsers()
        }
        return(loginStore.removeChangeListener(onChange))
    },[users.length])

    function onChange(){
        setUsers(loginStore.getUsersList())
    }

    const [data, setData] = React.useState({
        userName:'',
        department:'',
        password:'',
        confirm_password:'',
        check_textInputChange: false,
        check_confirmPassword: false,
        check_departmentTextInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        isValidDepartment: true
    })

    const { signUp } = React.useContext( AuthContext )

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

    const handleDeparmentChange= (val)=>{
        if(val === 'admin'){
            setData({
                ...data,
                department: val,
                check_departmentTextInputChange: true,
                isValidDepartment: true
            })
        }else if(val === 'user'){
            setData({
                ...data,
                department: val,
                check_departmentTextInputChange: true,
                isValidDepartment: true
            })
        }else{
            setData({
                ...data,
                department: val,
                check_departmentTextInputChange: false,
                isValidDepartment: false
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
                ...data,
                password: val,
                isValidPassword: false
            })
        }
    }
    const  handleConfirmPasswordChange = (val)=>{
       const password = data.password
       if(val === password){
           setData({
               ...data,
               confirm_password: val,
               check_confirmPassword: false
           })           
       }else{
           setData({
               ...data,
               confirm_password: val,
               check_confirmPassword: true
           })
       }
    }
    const handleValidUser = (userName)=>{
        console.log(findUser)
        const findUser = users.filter(item =>{
            return userName === item.username
        })
        if(findUser[0] !== undefined){
            if(data.userName === findUser[0].username){
                Alert.alert('Invalid User', 'This user allready exist.',[{text:'OK', onPress:()=>{navigation.navigate('Login')}}])
                return
            }
        }
    }
    const updateSecureTextEntry = ()=>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateConfirmSecureTextEntry = ()=>{
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }
    const registerHandle = (userName, department, password)=>{
        console.log(userName, department, password)
        if(userName < 4 || password < 8){
            Alert.alert('Wrong Input','Username, department or password is incorrect.',[{text: 'OK'}])
            return
        }
        signUp(userName, department, password)
    }
 
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
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
                <Text style={[styles.text_footer, {marginTop:35}]}>Department</Text>
                <View style={styles.action}>
                    <FontAwsome
                        name='building-o'
                        color='#05375a'
                        size={25}
                    />
                    <TextInput
                        placeholder='Your Department'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>handleDeparmentChange(val)}
                    />
                    {data.check_departmentTextInputChange?
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
                {data.isValidDepartment? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>You only can choose admin or user</Text>
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
                <Text style={[styles.text_footer, {marginTop:35}]}>Confirm Password</Text>
                <View style={styles.action}>
                    <FontAwsome
                        name='lock'
                        color='#05375a'
                        size={25}
                    />
                    <TextInput
                        placeholder='Confirm Your Password'
                        secureTextEntry={data.confirm_secureTextEntry ? true : false}
                        style={data.check_confirmPassword? styles.textInput : [styles.textInput, {color:'#05c957'}]}
                        autoCapitalize='none'
                        onChangeText={(val)=>handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
                    >
                        {data.confirm_secureTextEntry?
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
                <View style={styles.button}>
                    <TouchableOpacity 
                        onPress={()=> {registerHandle(data.userName, data.department, data.password)}}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.button,{marginTop: 30}]}>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('Login')}
                        style={[styles.signIn,{backgroundColor:'transparent', borderWidth: 1}]}>
                        <Text style={[styles.textSign,{color:'#030504'}]}>Sign In</Text>
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