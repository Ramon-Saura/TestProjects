import React, { useEffect } from 'react'
import { FlatList, View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import roomStore from '../../store/rooms-store'
import * as Animatable from 'react-native-animatable'
import {loadRooms} from '../../actions/room-actions'

const Stack =  createStackNavigator()

const MainScreen = ({route, navigation})=>{
    const user = route.params.username
    const [rooms, setRooms] = React.useState(roomStore.getRoomsList())
    useEffect(()=>{
        roomStore.addChangeListener(onChange)
        if(rooms.length === 0){
            loadRooms()
        }
        return ()=>(roomStore.removeChangeListener(onChange))
    },[rooms.length])
    function onChange(){
        setRooms(roomStore.getRoomsList())
    }
    if(!rooms){
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
    return(
        <Animatable.View
            animation='fadeInUpBig' 
            style={styles.container}>
            <FlatList
                keyExtractor={(item)=>(item.id.toString())}
                data={rooms}
                renderItem={({item})=>(
                    <Text style={styles.item}>{item.number}</Text>
                )}
            />
        </Animatable.View>
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
    item:{
        flex: 1,
        backgroundColor: '#33d5ff',
        marginTop: 10,
        paddingVertical: 50,
        paddingHorizontal: 100,
        fontWeight: 'bold',
        color: '#fff'
    }
  })