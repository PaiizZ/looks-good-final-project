import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { colors } from 'src/constant/mixins'
import { Actions } from 'react-native-router-flux'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

const { LoginButton, AccessToken } = FBSDK

export default class LoginPage extends Component {

    constructor (props) {
        super(props)

    }

    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
            if(result.isCancelled) {
                console.log('Loging was cancelled')
            } else {
                console.log('Login was a success' + result.grantedPermissions.toString())
            }
        }, function(error) {
            console.log('an error occured')
        })
    }

    render() {
        
        return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <LoginButton 
                    publicPermissions={["public_actions"]}
                    onLoginFinished={
                        (error, result) => {
                            if(error) {
                                console.log("login has error : " + result.error)
                            } else if(result.isCancelled) {
                                console.log("login is cancelled")
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        console.log(data.accessToken.toString())
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout")}
                />
                <Button 
                    title='Login with Facebook' 
                    backgroundColor={colors.blue}
                />
            </View>
            <Button
                    title='Go to Homepage'
                    style={ { marginTop: 10 }}
                    onPress={ () => Actions.tabMenu() }
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        marginTop: 50,
        marginBottom: 10
    }
})