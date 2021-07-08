import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

export default function Main({route, navigation}){
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