import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native'
import { colors } from 'src/constants/mixins'
import validate from 'src/services/validate'
import CoverImage from 'src/modules/shares/CoverImage'
import { connect } from 'react-redux'
import ChatActions from 'src/redux/actions/chat'
import Toast from 'react-native-simple-toast'

const ProfilePicture = ({ image_url }) => (
	<View style={styles.profileImage}>
		<CoverImage size={70} uri={image_url}/>
	</View>
)

class CommentChat extends Component {
	constructor (props) {
		super(props)
		this.state = {
			description: '',
			descriptionErr: ''
		}
	}

	async componentDidMount() {
		await this.setState({
			description: this.props.chat.description
		})
	}

	async saveEditChat(chat_id) {
		const descriptionErr = validate(['description'], [this.state.description.trim()])
		await this.setState({ descriptionErr })

		if (!descriptionErr) {
			const chat = {description: this.state.description}
			this.props.editChat(chat, this.props.review._id, chat_id)
			this.props.setEditChat(null)
		} else {
			Toast.show('กรุณาแสดงความคิดเห็น', Toast.SHORT)
		}		
	}
	
	render() {
		const { user, _id } = this.props.chat
		return (
			<View style={styles.container}>
				<ProfilePicture image_url={user.picture_url}/>
				<View style={styles.content}>
					<Text style={styles.username}>{user.name}</Text>
					{ _id !== this.props.editChatId ?
						<View>
							<Text style={styles.textLabel}>{this.state.description}</Text>
						</View> :
						<View>
							<View style={{ flex: 1, flexDirection: 'row'}}>
								<View style={styles.bodyTextInput}>
									<TextInput
										style={styles.textInput}
										multiline
										maxHeight={300}
										underlineColorAndroid="transparent"
										onChangeText={description => this.setState({ description })}
										value={this.state.description}
										keyboardType="default"
										onBlur={() => {
											this.setState({
												descriptionErr: validate(['description'], [this.state.description])
											})
										}}
										error={this.state.descriptionErr}
									/>
								</View>
							</View>
							<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
								<View style={{alignItems: 'flex-end', flexDirection: 'row', marginRight: 15 }}>
									<TouchableOpacity style={styles.buttonCancel} onPress={() => this.props.setEditChat(null)}>
										<Text style={styles.fontCancel}>Cancel</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.buttonSave} onPress={() => this.saveEditChat(_id)}>
										<Text style={styles.fontSave}>Save</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '95%'
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 5,
		marginLeft: 5
	},
	username: {
		fontWeight: 'bold'
	},
	textLabel: {
		color: colors.gray6,
		fontSize: 15
	},
	textInput: {
		fontSize: 15,
		color: colors.gray6,
		minHeight: 20,
		paddingTop: 0,
		paddingBottom: 0
	},
	fontCancel: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.gray2
	},
	fontSave: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.blue
	},
	buttonCancel: {
		marginTop: 5,
		marginRight: 10,
		borderRadius: 3
	},
	buttonSave: {
		marginTop: 5,
		marginRight: 0,
		borderRadius: 3
	},
	bodyTextInput: {
		flex: 1,
		marginTop: 5,
		marginRight: 15,
		padding: 5,
		borderColor: '#dfdfdf',
		borderWidth: 1
	}
})
 
const mapStateToProps = state => ({
	review: state.reviewReducer.currentReview,   
	editChatId: state.chatReducer.editChatId
})

const mapDispatchToProps = dispatch => ({
	editChat: (chat, review_id, chat_id) => {
		dispatch(ChatActions.editChat(chat, review_id, chat_id))
	},
	setEditChat: (chat_id) => {
		dispatch(ChatActions.setEditChat(chat_id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentChat)
