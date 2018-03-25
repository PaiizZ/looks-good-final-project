import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button
} from 'react-native'

import { colors } from 'src/constants/mixins'
import UserActions from 'src/redux/actions/user'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

export class ChangeStatusPage extends Component {
	constructor (props) {
		super(props)
		this.state = {
			description: ''
		}
	}

	componentDidMount() {
		if (this.props.currentUser.description) {
			this.setState({ description: this.props.currentUser.description })
		}
	}

	saveButtonClick() {
		this.props.changeUserStatus(this.props.currentUser._id, this.state.description)
		Actions.pop()
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.toCenter}>
					<Text style={styles.statusText}>Change your status</Text>
				</View>
				<View style={styles.toCenter}>
					<View style={styles.textBox}>
						<TextInput 
							placeholder='Type your status'
							multiline={true}
							style={styles.textInput}
							underlineColorAndroid='transparent'
							value={this.state.description}
							onChangeText={(description) => this.setState({ description })}
						/>
					</View>
				</View>
				<View style={styles.toCenter}>
					<View style={styles.buttonContainer}>
						<Button title='Save' color={colors.meat} onPress={() => this.saveButtonClick()}/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
	statusText: {
		fontSize: 16,
		marginTop: 20,
		fontWeight: 'bold'
	},
	textBox: {
		backgroundColor: colors.lightGray,
		marginTop: 30,
		width: '90%'
	},
	textInput: {
		width: 300,
		padding: 10,
		borderRadius: 5
	},
	buttonContainer: {
		marginTop: 30,
		width: 80
	},
	toCenter: {
		flexDirection: 'row',
		justifyContent: 'center'
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
	changeUserStatus: (user_id, description) => {
		dispatch(UserActions.changeUserDescription(user_id, description))
	}       
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatusPage)