import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import loginStore from '../../store/login-store'
import { loadUser } from '../../actions/login-actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../context'

const Stack =  createStackNavigator()

const ProfileScreen =({route, navigation})=>{
    const username = route.params.username
    const [user, setUser]= React.useState(loginStore.getUser(username))

    useEffect(()=>{
        loginStore.addChangeListener(onChange)
        if(!user){
            loadUser(username)
        }
        return ()=>(loginStore.removeChangeListener(onChange))
    },[user])

    function onChange(){
        setUser(loginStore.getUser(username))
    }
    if(!user){
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <Text>You are in profile {username}</Text>
        </View>
    )
}

export default function Profile({route, navigation}){
    const user = route.params.username
    return(
        <Stack.Navigator screenOptions={{
            headerStyle:{backgroundColor:'#33d5ff'},
            headerTintColor:'#fff',
            headerTitleStyle:{fontWeight:'bold'}
        }}>
            <Stack.Screen name='Profile' component={ProfileScreen} initialParams={{username: user}} options={{
                headerLeft: ()=>{
                    return(
                        <Icon.Button 
                        name='ios-menu' 
                        size={30} 
                        marginLeft={10} 
                        backgroundColor='#33d5ff' 
                        onPress={()=>{navigation.openDrawer()}}></Icon.Button>
                    )
                }
            }}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#33d5ff'
    }
  })