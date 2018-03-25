import {
	Platform,
	ScrollView,
	StyleSheet,
	View
} from 'react-native'
import React, { Component } from 'react'

import NavBarSearch from 'src/modules/shares/NavBarSearch'
import ReviewList from 'src/modules/home/components/ReviewList'
import { colors } from 'src/constants/mixins'
import reviewsMock from 'src/mockData/reviews'

export default class GlobalPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: ''
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
		// Keyboard.dismiss()
		await this.setState({
			isSearch: false,
			// overlaySearch: false,
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
				<ScrollView>
					<View style={styles.body}>
						<ReviewList review_list={reviewsMock}/>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.lightGray
	},
	body: {
		backgroundColor: colors.lightGray
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 8
	},
	header: {
		backgroundColor: colors.white,
		overflow: 'hidden'
	}
})
