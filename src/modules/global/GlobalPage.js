import {
	Platform,
	ScrollView,
	StyleSheet,
	View,
	RefreshControl
} from 'react-native'
import React, { Component } from 'react'

import NavBarSearch from 'src/modules/shares/NavBarSearch'
import { colors } from 'src/constants/mixins'
import ReviewActions from 'src/redux/actions/review'
import { connect } from 'react-redux'
import ReviewsGrid from 'src/modules/shares/ReviewsGrid'

export class GlobalPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: ''
		}
	}

	fetchData() {
		this.props.getReviews()
	}

	refreshData () {
		this.fetchData()
	}

	componentDidMount() {
		this.fetchData()
	}

	shouldComponentUpdate(nextProps, nextState) {
		return ((this.props.reviews !== nextProps.reviews) || 
		(this.props.loading !== nextProps.loading) ||
		(this.props.currentPage !== nextProps.currentPage)) && 
		nextProps.currentPage === 'global'
	}
	
	componentDidUpdate(prevProps, prevState) {
		if ((this.props.currentPage !== prevProps.currentPage) && this.props.currentPage === 'global') {
			this.fetchData()
		}
	}

	setIsSearch() {
		this.setState({ isSearch: true })
	}

	handleSearchText(text) {
		if (text === '') {
			this.setState({ isSearch: false })
		} else {
			this.setState({ isSearch: true })
		}
		this.setState({ searchText: text })
	}

	async cancelSearch() {
		await this.setState({
			isSearch: false,
			searchText: ''
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBarSearch
							searchText={this.state.searchText}
							isSearch={this.state.isSearch}
							handleSearchText={text => this.handleSearchText(text)}
							setIsSearch={() => this.setIsSearch()}
							cancelSearch={() => this.cancelSearch()}
						/>
					</View>
				</View>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.props.loading}
							onRefresh={() => this.refreshData()}
						/>
					}
				>
					<View style={styles.body}>
						{ this.props.reviews ?
							<ReviewsGrid review_list={this.props.reviews} page={'GlobalPage'}/>
							: <View/>
						}
					</View>
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
	body: {
		backgroundColor: colors.white
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 8
	},
	header: {
		backgroundColor: colors.orange,
		overflow: 'hidden'
	}
})

const mapStateToProps = state => ({
	reviews: state.reviewReducer.reviews,
	currentPage: state.menuReducer.currentPage,
	loading: state.reviewReducer.loading
})

const mapDispatchToProps = dispatch => ({
	getReviews: () => {
		dispatch(ReviewActions.getReviews())
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(GlobalPage)

