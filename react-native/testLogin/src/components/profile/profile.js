import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { AuthContext } from '../context'

export default function Profile(){

    const { signOut } = React.useContext(AuthContext)

    return(
        <View style={styles.container}>
            <Text>You are login in correctly</Text>
            <Button 
                onPress={()=>{signOut()}}
                style={styles.button}
                title='SignOut'
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