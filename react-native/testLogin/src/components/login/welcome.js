import React from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native'
import * as Animatable from 'react-native-animatable'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

export default function Welcome({navigation}){
    return(
        <View  style={styles.container}>
            <View style={styles.header}>
               <Animatable.Image
                        animation='bounceIn'
                        duration={1500}
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity 
                    style={styles.singIn}
                    onPress={()=>navigation.navigate('Login')}
                    >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name='navigate-next'
                                color='#33d5ff'
                                size={20}
                            />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer:{
        flex: 1,
        backgroundColor: '#33d5ff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo:{
        width: height_logo,
        height: height_logo
    },
    title:{
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text:{
        color: '#fff',
        marginTop: 5
    },
    button:{
        alignItems: 'flex-end',
        marginTop: 30
    },
    singIn:{
        width: 150,
        height: 40,
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign:{
        color:'#33d5ff',
        fontWeight: 'bold'
    }
  })