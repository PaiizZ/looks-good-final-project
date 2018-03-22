import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import React, { Component } from 'react'

import { Actions } from 'react-native-router-flux'
import CoverImage from 'src/modules/shares/CoverImage'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import ReviewActions from 'src/redux/actions/review'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import icons from 'src/constants/icons'

const ProfilePicture = ({ image_url }) => {
	return ( 
		<CoverImage size={50} url={image_url}/>
	)
}

const BookMark = ({ isActive }) => {
	return (
		<View style={styles.bookmark}> 
			{ isActive ? 
				<IconMaterial name="bookmark" size={36}/>
				: <IconMaterial name="bookmark-border" size={36}/>
			}
		</View>
	)
}

function Header({ reviewer_name, profile_url, time, isSaved }) {
	return (
		<View style={styles.headerContainer}>
			<ProfilePicture image_url={profile_url} />
			<View style={styles.headerWrapper}>
				<Text style={styles.reviewerName}>{reviewer_name}</Text>
				<Text style={styles.timeText}>{time}</Text>
			</View>
			<BookMark isActive={isSaved} />
		</View>
	)
}

const ProductPicture = ({ image_url, review, setReview }) => {
	return ( 
		<View>
			{ image_url ?
				<TouchableOpacity onPress={() => {
					setReview(review)
					Actions.viewProductPage()
				}}>
					<Image
						style={styles.productImage}
						source={image_url}
						resizeMode='contain'
					/> 
				</TouchableOpacity>
				: <View/> }
		</View>
	)
}

function Body({ product_url, title, review, setReview }) {
	return (
		<View>
			<ProductPicture image_url={product_url} review={review} setReview={setReview}/>
			<Text style={styles.titleText}>{title}</Text>
		</View>
	)
}

function Footer({ rating, price, numberOfComment}) {
	return (
		<View style={styles.footerContainer}>
			<View style={styles.productDetail}>
				<IconMaterial name='star-border' size={24}/>
				<Text style={styles.productDetailRating}>{rating}</Text>
			</View>
			<View style={styles.productDetail}>
				<Image style={styles.bahtImage} source={icons.baht} resizeMode='cover'/>
				<Text style={styles.productDetailMoney}>{price}</Text>
			</View>
			<View style={styles.productDetail}>
				<IconMaterial name='chat-bubble-outline' size={24}/>
				<Text style={styles.productDetailComment}>{numberOfComment}</Text>
			</View>
		</View>
	)
}

export class ReviewCard extends Component {

	constructor (props) {
		super(props)
	}
  
	render() {
		const { title, user, picture_cover_url, product_price, comment_list, overall_rating, timestamp } = this.props.review
		
		return (
			<View style={styles.container}>
				<Header reviewer_name={user.name} profile_url={user.profile_url} time={timestamp} isSaved={false} />
				<Body product_url={picture_cover_url} title={title} review={this.props.review} setReview={this.props.setCurrentReview}/>
				<Footer rating={overall_rating} price={product_price} numberOfComment={comment_list.length} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		marginBottom: 5
	},
	headerWrapper: {
		flexDirection: 'column',
		marginLeft: 10,
		marginVertical: 5
	},
	reviewerName: {
		fontWeight: 'bold',
		color: colors.gray,
		fontSize: 12
	},
	timeText: {
		fontSize: 12
	},
	bookmark: {
		flex: 1,
		alignItems: 'flex-end',
		paddingRight: 10,
		marginVertical: 5
	},
	productImage: {
		width: '100%',
		height: 260
	},
	bahtImage: {
		width: 24,
		height: 24
	},
	titleText: {
		marginLeft: 20,
		marginTop: 10
	},
	footerContainer: {
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 10
	},
	productDetail: {
		flexDirection: 'row',
		marginLeft: 10
	},
	productDetailRating: {
		marginLeft: 2,
		marginVertical: 1
	},
	productDetailMoney: {
		marginLeft: 1,
		marginVertical: 1
	},
	productDetailComment: {
		marginLeft: 6
	}
})

const mapDispatchToProps = dispatch => ({
	setCurrentReview: review => {
		dispatch(ReviewActions.setCurrentReview(review))
	}
})

export default connect(null, mapDispatchToProps)(ReviewCard)