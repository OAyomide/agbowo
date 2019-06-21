import React, { Component } from 'react'
import { View } from 'react-native'
import SelectBank from './Bank'
import Withdrawals from './transactions/Withdrawals'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from 'react-navigation';

class Welcome extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSelectedBank: false,
			selectedBank: ''
		}
	}

	async componentDidMount() {
		console.log(`PROPS IN HOME ARE::`, this.props)
		const selectedBank = await AsyncStorage.getItem('selectedBank')
		if (selectedBank) {
			// the user hasnt selected a bank (i.e part of the onboarding flow)
			this.setState({ isSelectedBank: true })
		}
		this.setState({ selectedBank: selectedBank })
	}

	render() {
		return (
			<View>
				{this.state.isSelectedBank ? <Withdrawals/> : <SelectBank/>}
			</View>
		)
	}
}

export default Welcome