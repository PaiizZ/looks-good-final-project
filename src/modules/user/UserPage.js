import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'

import { Actions } from 'react-native-router-flux'
import { Divider } from 'react-native-elements'
import InfoBar from 'src/modules/user/components/InfoBar'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ReviewsGrid from 'src/modules/user/components/ReviewsGrid'
import Tabs from 'src/modules/shares/Tabs'
import UserActions from 'src/redux/actions/user'
import UserPhoto from 'src/modules/user/components/UserPhoto'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import { APP_FULL_HEIGHT } from 'src/constants'

export class UserPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.fetchData()
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.props.currentUser !== nextProps.currentUser) || 
		(this.props.ownReviews !== nextProps.ownReviews) || 
		(this.props.currentPage !== nextProps.currentPage)
	}
	
	componentDidUpdate(prevProps, prevState) {
		if ((this.props.currentPage !== prevProps.currentPage) && this.props.currentPage === 'user') {
			this.fetchData()
		}
	}

	fetchData() {
		this.props.getCurrentUser()
		this.props.getCurrentUserOwnReviews()
	}

	goToSettingPage() {
		Actions.settingPage()
	}

	goToLoginPage() {
		Actions.loginPage()
	}

	fetchSaveReviews() {
		if (this.props.saveReviews == null) {
			this.props.getCurrentUserSaveReviews()
		}
	}

	render() {
		if (!this.props.currentUser && this.props.success) {
			this.goToLoginPage()
			return <View/>
		}
		else {
			return (
				<ScrollView contentContainerStyle={styles.container}>
					{ !this.props.currentUser ? 
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="large" />
						</View>
						: <View style={styles.body}>
							<View style={[styles.settingIconContainer, { right: 10 }]}>
								<MaterialIcons
									name="settings"
									size={25}
									onPress={() => this.goToSettingPage()}
								/>
							</View>
							<UserPhoto
								username={this.props.currentUser.name}
								description={this.props.currentUser.description}
								size={120}
								image_url={this.props.currentUser.picture_url}
							/>
							<View style={styles.infoBar}>
								<InfoBar
									review_num={this.props.currentUser.own_post_list.length}
									comment_num={0}
									follower_num={this.props.currentUser.follower_list.length}
									following_num={this.props.currentUser.following_list.length}
								/>
							</View>
							<View style={{ alignItems: 'center' }}>
								<Divider style={styles.divider} />
							</View>
							<View style={styles.tabsContainer}>
								<Tabs>
									<View title="Reviews">
										<ReviewsGrid review_list={this.props.ownReviews} />
									</View>
									<View title="Saved" onSelectedTab={() => this.fetchSaveReviews()}>
										<ReviewsGrid review_list={this.props.saveReviews} />
									</View>
								</Tabs>
							</View>
						</View>
					}
				</ScrollView>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		paddingTop: Platform.OS === 'ios' ? 10 : 0
	},
	body: {
		marginTop: 10
	},
	infoBar: {
		marginTop: 20
	},
	divider: {
		backgroundColor: colors.lightGray,
		marginTop: 15,
		height: 1.2,
		width: '100%'
	},
	tabsContainer: {
		marginTop: 20,
		paddingLeft: 12,
		paddingRight: 12
	},
	settingIconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	loadingContainer: {
		marginTop: APP_FULL_HEIGHT/2
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	success: state.userReducer.success,
	ownReviews: state.userReducer.ownReviews,
	saveReviews: state.userReducer.saveReviews,
	currentPage: state.menuReducer.currentPage
})

const mapDispatchToProps = dispatch => ({
	getCurrentUser: () => {
		dispatch(UserActions.getCurrentUser())
	},
	getCurrentUserOwnReviews: () => {
		dispatch(UserActions.getCurrentUserOwnReviews())
	},
	getCurrentUserSaveReviews: () => {
		dispatch(UserActions.getCurrentUserSaveReviews())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
