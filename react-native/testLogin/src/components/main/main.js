import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'

const Stack =  createStackNavigator()

const MainScreen = ({route, navigation})=>{
    const user = route.params.username
    return(
        <View style={styles.container}>
            <Text>You are login in correctly, hello {user} </Text>
            <Button 
                onPress={()=>navigation.navigate('Profile')}
                style={styles.button}
                title='Profile'
            >
            </Button>
        </View>
    )
}

export default function Main ({route, navigation}){
    const user = route.params.username
    return(
        <Stack.Navigator screenOptions={{
                headerStyle:{backgroundColor:'#33d5ff'},
                headerTintColor:'#fff',
                headerTitleStyle:{fontWeight:'bold'}
            }}>
            <Stack.Screen name='Main' component={MainScreen} initialParams={{username: user}} options={{
                headerLeft: ()=>{
                    return(
                        <Icon.Button name='ios-menu' size={30} marginLeft={10} backgroundColor='#33d5ff' onPress={()=>{navigation.openDrawer()}}></Icon.Button>
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