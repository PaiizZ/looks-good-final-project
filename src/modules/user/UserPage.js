import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'
import React, { Component } from 'react'

import NavBar from '../shares/NavBar'

export default class UserPage extends Component {
    constructor (props) {
      super(props)
    
    }
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <Text>UserPage</Text>
          </View>
          <View style={styles.header}>
            <View style={styles.platformHeader}>
              <NavBar titleName="UserPage"/>
            </View>
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    body: {
      marginTop: Platform.OS === 'ios' ? 75 : 60
    },
    platformHeader: {
      height: Platform.OS === 'ios' ? 75 : 60,
      paddingTop: Platform.OS === 'ios' ? 25 : 0
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      overflow: 'hidden',
      zIndex: 1
    },
    coverHeader: {
      height: Platform.OS === 'ios' ? 75 : 60,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 0
    },
    coverFooter: {
      height: 40,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0
    }
  })