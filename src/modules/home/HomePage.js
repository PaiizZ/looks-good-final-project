import React, { Component } from 'react'
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import NavBar from 'src/modules/shares/NavBar'
import { Card, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import ReviewList from 'src/modules/home/components/ReviewList'

const reviewsMock = [
	{
		title: 'Etude House BB Cream is The best BB Cream',
		user: {
			username: 'Phasin Sarunpornkul',
			profile_url: images.profile
		},
		picture_cover_url: images.product1,
		product: {
			price: 500
		},
		comment_list: ['1', '2', '3'],
		rating: 5.0,
		timestamp: '4 hours ago'
	},
	{
		title: 'Skinfood Peach Cotton is The best BB Cream',
		user: {
			username: 'Paiiz Wanchanapon',
			profile_url: images.profile
		},
		picture_cover_url: images.product2,
		product: {
			price: 300
		},
		comment_list: ['1', '2', '3', '4'],
		rating: 4.5,
		timestamp: '6 hours ago'
	}
]

export default class HomePage extends Component {
	constructor (props) {
		super(props)
	}
  
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.body}>
						<ReviewList review_list={reviewsMock}/>
					</View>
				</ScrollView>
			<View style={styles.header}>
				<View style={styles.platformHeader}>
					{/* <NavBar titleName="HomePage"/> */}
				</View>
			</View>
			</View>
		)
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
		zIndex: 2
	}
})