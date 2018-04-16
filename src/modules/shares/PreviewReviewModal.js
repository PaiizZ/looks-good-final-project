import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native'
import Modal from 'react-native-modal'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import icons from 'src/constants/icons'

class PreviewReviewModal extends Component {
	render () {
		if (!this.props.review) return <View/>
		return (
			<Modal 
				isVisible={this.props.showPreviewReview}
				backdropColor={colors.gray2}
				backdropOpacity={0.5}
				backdropTransitionInTiming={100}
				backdropTransitionOutTiming={100}
			>
				<View style={styles.container}>
					<Text style={styles.productName}>
						{this.props.review.product.name}
					</Text>
					<Image
						style={styles.imageStyle}
						source={{ uri: this.props.review.picture_cover_url }}
						resizeMode='cover'
					/>
					<View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
						<View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
							<IconMaterial name="star-border" color={colors.yellow} size={40} />
							<Text style={{ fontSize: 20, marginLeft: 5, marginTop: 5 }}>{this.props.review.rating}</Text>
						</View>
						{ this.props.review.price &&
							<View style={{ flexDirection: 'row', marginRight: 10, marginTop: 5 }}>
								<Text style={{ fontSize: 20, marginRight: 5 }}>{this.props.review.price}</Text>
								<Image
									source={icons.baht}
									resizeMode="cover"
									style={styles.priceIcon}
								/>
							</View> }
					</View>
				</View>
			</Modal>
		)
	}
}

const mapStateToProps = state => ({
	showPreviewReview: state.imageReducer.showPreviewReview,
	review: state.imageReducer.previewReview
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white, 
		borderRadius: 5, 
		alignItems: 'center'
	},
	imageStyle: {
		width: '100%',
		aspectRatio: 1
	},
	productName: {
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
		fontSize: 20,
		fontWeight: 'bold'
	},
	priceIcon: {
		width: 30,
		height: 30
	}
})

export default connect(mapStateToProps, null)(PreviewReviewModal)