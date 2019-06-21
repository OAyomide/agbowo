import React, { Component } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import { AppNavigator, WelcomeNavigator, NavigationConfig, SelectBankNavigator, WithdrawalsNavigator } from './app/components/Navigator'

const AppContainer = createAppContainer(createStackNavigator(
  {
    WelcomeLoading: WelcomeNavigator,
		App: AppNavigator,
		SelectBank: SelectBankNavigator,
		Withdrawals: WithdrawalsNavigator
  }, {
    headerMode: 'none'
  }
), {
  initialRouteName: 'Home'
}, NavigationConfig)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNewUser: false
    }
  }
  render() {
    return (
      <AppContainer/>
    )
  }
}

export default App

