import { StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

import InfoText from 'src/modules/user/components/InfoText'

export default class InfoBar extends Component {
    constructor (props) {
      super(props)
    }

    render() {
      return (
        <View style={styles.container}>
            <InfoText title='Reviews' number={this.props.review_num} />
            <InfoText title='Comments' number={this.props.comment_num} />
            <InfoText title='Follower' number={this.props.follower_num} />
            <InfoText title='Following' number={this.props.following_num} />
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
  })