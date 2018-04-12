import { Router, Scene } from 'react-native-router-flux'

import AddReviewPage from 'src/modules/addReview/AddReviewPage'
import EditReviewPage from 'src/modules/editReview/EditReviewPage'
import ChangeStatusPage from 'src/modules/setting/ChangeStatusPage'
import LoginPage from 'src/modules/login/LoginPage'
import { Provider } from 'react-redux'
import React from 'react'
import SettingPage from 'src/modules/setting/SettingPage'
import TabMenu from 'src/modules/shares/TabMenu'
import ViewReviewPage from 'src/modules/viewReview/ViewReviewPage'
import ViewUserPage from 'src/modules/user/ViewUserPage'
import ViewUserListPage from 'src/modules/user/ViewUserListPage'
import SearchPage from 'src/modules/search/SearchPage'
import store from 'src/redux/store'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Scene key="root">
					<Scene key="addReviewPage" component={AddReviewPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="viewReviewPage" component={ViewReviewPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="tabMenu" component={TabMenu} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical' initial/>
					<Scene key="loginPage" component={LoginPage} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical'/>
					<Scene key="settingPage" component={SettingPage} title='Settings' panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="viewUserPage" component={ViewUserPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="changeStatusPage" component={ChangeStatusPage} title='Change Status' panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="viewUserListPage" component={ViewUserListPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="SearchPage" component={SearchPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction="vertical"/>
					<Scene key="editReviewPage" component={EditReviewPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction="vertical"/>
				</Scene>
			</Router>
		</Provider>
	)
}

export default App
