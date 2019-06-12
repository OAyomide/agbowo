import React, { Component } from 'react'
import { View } from 'react-native'
import { Card, Text, ListItem } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation'
class Welcome extends Component {
	constructor(props) {
		super(props)
		this.state = {
			withdrawalTransactions: [] // for now, we leave it at this. later, we use async storage to get things going
		}
	}

	render() {
		return (
			<View style={{backgroundColor: '#D88F7F', height:'100%'}}>
				<Card title='All ATM Withdrawal' containerStyle={{ backgroundColor: '#DC7F6B' }}>
				<Text>
							Here, you see all the withdrawals you've made. When you make a withdrawal from the ATM, its automatically updated here.
					</Text>
					<Card>
						{this.state.withdrawalTransactions.length === 0 ? <Text>Oops! You don't have any recent withdrawal transaction.</Text> : this.state.withdrawalTransactions.map((x, y) => {
							return (
								<ListItem key={y} title='Withdrawn &#8358;5000 from --JAIZ BANK.....' />
							)
						})}
					</Card>
				</Card>
			</View>
		)
	}
}

export default Welcome