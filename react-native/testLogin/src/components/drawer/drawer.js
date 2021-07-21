import React, { useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import {Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../context'
import loginStore from '../../store/login-store'


export function DrawerContent({state, navigation, ...props}){
    const username = state.routes[0].params.username
    const [user, setUser] =  React.useState(loginStore.getUser(username))

    const { signOut } = React.useContext(AuthContext)

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                            <Avatar.Image
                            source={{
                                uri:'https://trello-attachments.s3.amazonaws.com/5f11b957273429681522af65/5f5755d3493d338105fdb51a/91379c8e0583b8d7c1aa1d81e8300adc/pngwing.com.png'
                            }}
                            size={50}    
                            />
                            <View style={{marginLeft: 15, flexDirection:'column'}}>
                            <Title style={styles.title}>{user.username}</Title>
                            <Caption style={styles.caption}>@{user.username}</Caption>
                        </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.DrawerContent, {marginTop: 30}}>
                        <DrawerItem
                            icon={({color, size})=>(
                                <Icon
                                    name='home-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Home'
                            onPress={()=>{props.navigation.navigate('Main')}}
                        />
                        <DrawerItem
                            icon={({color, size})=>(
                                <Icon
                                    name='account-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Profile'
                            onPress={()=>{props.navigation.navigate('Profile')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size})=>(
                        <Icon
                            name='exit-to-app'
                            color={color}
                            size={size}
                        />
                    )}
                    label='Sign Out'
                    onPress = {()=>{signOut()}}
                >
                </DrawerItem>
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent:{
        flex: 1,
        marginTop: 15
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection:'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph:{
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor:'#f4f4f4',
        borderTopWidth:1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal:16,
    }
})