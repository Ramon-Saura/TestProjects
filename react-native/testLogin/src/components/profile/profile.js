import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { AuthContext } from '../context'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'

const Stack =  createStackNavigator()

const ProfileScreen =()=>{

    const { signOut } = React.useContext(AuthContext)

    return(
        <View style={styles.container}>
            <Text>You are in profile</Text>
            <Button 
                onPress={()=>{signOut()}}
                style={styles.button}
                title='SignOut'
            >
            </Button>
        </View>
    )
}

export default function Profile({navigation}){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle:{backgroundColor:'#33d5ff'},
            headerTintColor:'#fff',
            headerTitleStyle:{fontWeight:'bold'}
        }}>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{
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