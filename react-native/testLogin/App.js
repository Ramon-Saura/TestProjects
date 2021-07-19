import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Alert} from 'react-native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Welcome from './src/components/login/welcome'
import Login from './src/components/login/login'
import Register from './src/components/login/register'
import Profile from './src/components/profile/profile'
import Main from './src/components/main/main'
import { AuthContext } from './src/components/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import saveUser from './src/actions/login-actions'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components/drawer/drawer'

const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function App() {

  initialLoginState= {
    isLoading: true,
    userName: null,
    userToken: null,
    userDepartment: null,
  }

  const loginReducer = (prevState, action) => {
    switch(action.type){
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          userToken: action.type,
          isLoading: false
        }
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.username,
          userToken: action.token,
          userDepartment: action.department,
          isLoading: false
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          userDepartment: null,
          isLoading: false
        }
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.username,
          userToken: action.token,
          userDepartment: action.department,
          userPassword: action.password,
          isLoading: false
        }
    }
  }
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(()=>{
    return({
      signIn: async(foundUser) => {
        const userToken  = String(foundUser[0].token)
        const userName  = foundUser[0].username
        const userDepartment = foundUser[0].department
          try{
            await AsyncStorage.setItem('userToken', userToken)
          }catch(error){
            Alert.alert('Error signIn')
          }
      
        dispatch({ type: 'LOGIN', username: userName, department: userDepartment, token: userToken})
      },
      signOut: async()=>{
        try{
          AsyncStorage.removeItem('userToken')
        }catch(error){
          Alert.alert('Error signOut')
        }
        dispatch({ type: 'LOGOUT'})
      },
      signUp: async(userName, department, password)=>{
        const username = userName
        const userDepartment = department
        const userPassword = password
        const userToken = randomToken(8)
        saveUser(username, userDepartment, userPassword, userToken)
        try{
          AsyncStorage.setItem('userToken', userToken)
        }catch(error){
          Alert.alert('Error Register')
        }
        dispatch({ type: 'REGISTER', username: username, department: userDepartment, password: userPassword, token: userToken})
      }})
    
  },[])

  useEffect(()=>{
    setTimeout( async()=>{
      let userToken
      userToken = null
      try{
        userToken = await AsyncStorage.getItem('userToken')
      }catch(error){
        Alert.alert('Error useEffect')
      }
      dispatch({ type: 'REGISTER', token: userToken})
    },1000)
  },[])

  if(loginState.isLoading){
    return(
      <View style={styles.container}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name='Main' component={Main} initialParams={{username: loginState.userName}}/>
          <Drawer.Screen name='Profile' component={Profile}/>
        </Drawer.Navigator>
        )
        :
        (
        <Stack.Navigator headerMode='none'>   
         <Stack.Screen name='Welcome' component={Welcome}/>
         <Stack.Screen name='Login' component={Login}/>
         <Stack.Screen name='Register' component={Register}/>
        </Stack.Navigator> 
        )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})