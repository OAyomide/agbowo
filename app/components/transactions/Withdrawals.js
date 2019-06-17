import React, { Component } from 'react'
import { View } from 'react-native'

class Withdrawals extends Component {
	constructor(props) {
		super(props)
		this.state = {
			withdrawals: {}
		}
	}

	render() {
		return (
			<View>
				<Text> Withdrawals made are displayed here</Text>
			</View>
		)
	}
}

export default Withdrawals