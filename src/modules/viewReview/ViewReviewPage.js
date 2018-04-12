import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import AddComment from 'src/modules/viewReview/components/AddComment'
import CommentSection from 'src/modules/viewReview/components/CommentSection'
import ContentSection from 'src/modules/viewReview/components/ContentSection'
import { Divider } from 'react-native-elements'
import NavBarViewReview from 'src/modules/viewReview/components/NavBarViewReview'
import UserActions from 'src/redux/actions/user'
import CommentActions from 'src/redux/actions/comment'
import ReviewActions from 'src/redux/actions/review'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'

export class ViewReviewPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.getCurrentUser()
		this.props.getComments(this.props.review._id)
	}

	addComment(comment) {
		this.props.addComment(comment, this.props.review._id)
	}

	render() {
		console.log(this.props.review, 'review')
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBarViewReview 
							review={this.props.review}
							deleteReview={(review_id) => this.props.deleteReview(review_id)}
						/>
					</View>
				</View>
				<ScrollView>
					<ContentSection review={this.props.review} />
					<CommentSection 
						review={this.props.review}
						deleteComment={(review_id, comment_id) => this.props.deleteComment(review_id, comment_id)}
						setEditComment={(review_id, comment_id) => this.props.setEditComment(review_id, comment_id)}
					/>
					<Divider style={styles.divider} />
					<AddComment 
						style={styles.addComment} 
						user={this.props.currentUser} 
						addComment={(comment) => this.addComment(comment)}
					/>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: colors.transparent,
		overflow: 'hidden',
		zIndex: 1
	},
	divider: {
		backgroundColor: colors.lightGray,
		marginTop: 5,
		height: 1.2,
		width: '100%'
	},
	addComment: {
		marginTop: 10
	}
})

const mapStateToProps = state => ({
	review: state.reviewReducer.currentReview,
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
	getCurrentUser: () => {
		dispatch(UserActions.getCurrentUser())
	},
	addComment: (comment, review_id) => {
		dispatch(CommentActions.addComment(comment, review_id))
	},
	getComments: (review_id) => {
		dispatch(CommentActions.getComments(review_id))
	},
	deleteComment: (review_id, comment_id) => {
		dispatch(CommentActions.deleteComment(review_id, comment_id))
	},
	setEditComment: (review_id, comment_id) => {
		dispatch(CommentActions.setEditComment(review_id, comment_id))
	},
	deleteReview: (review_id) => {
		dispatch(ReviewActions.deleteReview(review_id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewReviewPage)
