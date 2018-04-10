import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import Comment from 'src/modules/viewReview/components/Comment'
import StarBar from 'src/modules/viewReview/components/StarBar'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'

function countRatingFrequency(comment_list) {
	let rating_frequency_list = [0, 0, 0, 0, 0]
	for (const comment of comment_list) {
		rating_frequency_list[5-comment.rating]++ 
	}
	return rating_frequency_list
}

function RatingFrequency ({ comment_list }) {
	const rating_frequency_list = countRatingFrequency(comment_list)
	return (
		<View style={styles.ratingFrequencyPanel}>
			{ rating_frequency_list.map((rating_count, index) => (
				<View style={styles.ratingRow} key={index}>
					<StarBar rating={5-index} size={20}/>
					<View style={styles.progressBar}>
						<View style={{ height: 15, width: `${rating_count/(comment_list.length)*100}%`, backgroundColor: colors.darkBlue}}/>
					</View>
					<Text>{rating_count}</Text>
				</View>
			))}
		</View>
	)
}
    
class CommentSection extends Component {
	constructor (props) {
		super(props)
		this.state = {
			// comment_list: [],
			indexComment: -1
		}
	}

	// async componentWillReceiveProps(nextProps) {
	// 	await this.setState({comment_list: nextProps.comments})
	// }

	handleEditComment(property, text) {
		const contact = this.state.isEdit
		contact[property] = text
		this.setState({ contentMessage: contact })
	}

	async showActionSheet1(index) {
		await this.setState({ indexComment: index })
		this.ActionSheet1.show()
	}

	async showActionSheet2(index) {
		// await this.setState({ indexComment: index })
		this.ActionSheet2.show()
	}


	// editComment={(comment, review_id, comment_id) => this.props.editComment(comment, review_id, comment_id)} 
	// deleteComment={(review_id, comment_id) => this.props.deleteComment(review_id, comment_id)}
	optionsSelect(index) {
		const comment_list = this.props.comments
		if (index === 0) {
			this.props.setEditComment(this.props.review._id, comment_list[this.state.indexComment]._id)
		} else if (index === 1) {
			// console.log(this.state.indexComment)
			// console.log(this.props.review._id, comment_list[this.state.indexComment], '<3 <3 <3')
			this.props.deleteComment(this.props.review._id, comment_list[this.state.indexComment]._id)
		}
	}

	copyComment() {
		
	}

	render() {
		const comment_list = this.props.comments
		const user = this.props.currentUser
		console.log(comment_list, 'comment_list')
		console.log(this.props.currentUser, 'user')
		// console.log(this.props.editComment, 'editComment')
		return (
			this.props.success && (
				<View>
					{comment_list.length <= 0 ? <View/> :
						<View>
							<Divider style={styles.divider} />
							<View>
								<Text style={styles.totalText}>{comment_list.length} Reviews</Text>
								<RatingFrequency comment_list={comment_list}/>
								<View style={styles.commentList}>
									{ comment_list.map((comment, index) => (
										<View key={index}>
											{ user._id === comment.user._id ?
												<TouchableOpacity 
													delayLongPress={1000} 
													onLongPress = {() => this.showActionSheet1(index)}>
													<View style = {styles.commentItem} >
														<Comment
															comment={comment}
															editComment={(comment, review_id, comment_id) => this.props.editComment(comment, review_id, comment_id)} 
															setEditComment={(review_id, comment_id) => this.props.setEditComment(review_id, comment_id)}
														/>
													</View>
												</TouchableOpacity> :
												<TouchableOpacity 
													delayLongPress={1000} 
													onLongPress = {() => this.showActionSheet2(index)}>
													<View style = {styles.commentItem} >
														<Comment
															comment={comment}
														/>
													</View>
												</TouchableOpacity>
											}
										</View>
									))}
								</View>
							</View> 
							<ActionSheet
								ref={o => this.ActionSheet1 = o}
								options={['Edit', 'Delete', 'Cancel']}
								cancelButtonIndex={2}
								destructiveButtonIndex={1}
								onPress={(index) => this.optionsSelect(index)}
							/>
							<ActionSheet
								ref={o => this.ActionSheet2 = o}
								options={['Copy', 'Cancel']}
								cancelButtonIndex={1}
								onPress={() => this.copyComment()}
							/>
						</View>
					}
				</View>
			)
		)
	}
}

const styles = StyleSheet.create({
	totalText: {
		fontWeight: 'bold',
		marginTop: 15,
		marginLeft: 30
	},
	ratingRow: {
		flexDirection: 'row'
	},
	ratingFrequencyPanel: {
		marginTop: 10,
		marginLeft: 20,
		marginBottom: 20
	},
	progressBar: {
		backgroundColor: colors.lightGray,
		height: 15,
		width: 200,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10
	},
	commentList: {
		marginLeft: 20
	},
	commentItem: {
		marginBottom: 20
	},
	divider: {
		backgroundColor: colors.lightGray,
		marginTop: 5,
		height: 1.2,
		width: '100%'
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	comments: state.commentReducer.comments,
	success: state.commentReducer.success,
	editComment: state.commentReducer.editComment
})

export default connect(mapStateToProps, null)(CommentSection)
