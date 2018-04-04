import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import React, { Component } from 'react'

import CoverImage from 'src/modules/shares/CoverImage'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from 'src/constants/mixins'

export default class AddComment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: '',
			rating: 0,
			stars: ['star-o', 'star-o', 'star-o', 'star-o', 'star-o']
		}
	}

	changeRating(index) {
		var stars = []
		for (let i = 0; i < 5; i++) {
			if (i < index + 1) stars.push('star')
			else stars.push('star-o')
		}

		this.setState({
			rating: index + 1,
			stars: stars
		})
	}

	render() {
		if (!this.props.user) return <View />
		else {
			const { picture_url } = this.props.user
			return (
				<View style={{ marginTop: 10, marginBottom: 50 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<CoverImage uri={picture_url} size={80} />
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 10
						}}
					>
						<Text style={{ position: 'absolute', left: 20, fontSize: 12 }}>
							Tap to rate
						</Text>
						<View style={{ flexDirection: 'row' }}>
							{this.state.stars.map((item, index) => (
								<TouchableOpacity
									key={index}
									onPress={() => this.changeRating(index)}
								>
									<IconFontAwesome
										style={styles.star}
										name={this.state.stars[index]}
										size={40}
										color={colors.yellow}
									/>
								</TouchableOpacity>
							))}
						</View>
					</View>
					{this.state.rating !== 0 && (
						<View style={{ flexDirection: 'row', marginTop: 10 }}>
							<View style={styles.bodyTextInput}>
								<TextInput
									style={styles.textInput}
									multiline
									maxHeight={300}
									underlineColorAndroid="transparent"
									onChangeText={message => this.setState({ message })}
									value={this.state.message}
									keyboardType="default"
								/>
							</View>
							<TouchableOpacity style={styles.buttonSend}>
								<Text style={styles.fontSend}>Send</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	star: {
		marginRight: 5
	},
	textInput: {
		fontSize: 15,
		color: colors.black,
		minHeight: 15,
		paddingTop: 0,
		paddingBottom: 0
	},
	fontSend: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.orange
	},
	buttonSend: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		marginBottom: 10,
		right: 8,
		borderRadius: 3
	},
	bodyTextInput: {
		flex: 1,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		padding: 10,
		borderColor: '#dfdfdf',
		borderWidth: 1
	}
})