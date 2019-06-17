import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ToastAndroid, PermissionsAndroid, ScrollView } from 'react-native'
import { Card, Text, ListItem } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation'
import SmsAndroid from 'react-native-get-sms-android'
import _ from 'lodash'

class Welcome extends Component {
	constructor(props) {
		super(props)
		this.state = {
			withdrawalTransactions: [], // for now, we leave it at this. later, we use async storage to get things going,
			hasPermissions: false
		}
	}

	async componentDidMount() {
		// StackActions.reset({
		// 	index: 0,
		// 	actions: [NavigationActions.navigate({ routeName: 'Home' })]
		// });
		const hasPermissions = await this.checkPermissions()
		console.log(`HAS NECESSARY PERMISSIONS::`, hasPermissions)

		if (hasPermissions) {
			let filter = {
				box: 'inbox'
			}

			SmsAndroid.list(JSON.stringify(filter), err => {
				console.log(`ERROR GETTING LIST OF SMS FROM DEVICE`, err)
			}, (count, list) => {
				const all = JSON.parse(list)
				// console.log(`LIST OF SMS FROM DEVICE IS`, all)
				const gtbankMessages = _.filter(all, x => {
					if (x.address === 'GTBank') {
						console.log(`EACH GTBANK MESSAGE OBJ ADDRESS ISS:::`, x.address)
						return x
					}
				})
				console.log(`NUMBER OF RECENT TRANSACTIONS::`, gtbankMessages.length)
				this.setState({ withdrawalTransactions: gtbankMessages })
			})
		}
		this.setState({ hasPermissions: hasPermissions })
	}

	async checkPermissions() {
		console.log("checking SMS permissions");
		let hasPermissions = false;
		try {
			hasPermissions = await PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.READ_SMS
			);
			if (!hasPermissions) return false;
			hasPermissions = await PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.SEND_SMS
			);
			if (!hasPermissions) return false;
		} catch (e) {
			console.error(e);
		}
		return hasPermissions;
	}

	async HandlePermissionAccess() {
		let granted = {};
		try {
			console.log("requesting SMS permissions");
			granted = await PermissionsAndroid.requestMultiple(
				[
					PermissionsAndroid.PERMISSIONS.READ_SMS,
					PermissionsAndroid.PERMISSIONS.SEND_SMS
				],
				{
					title: "Hey Nigga. Access request",
					message: "The main idea of this app requires reading your sms. Your stupid ass needs to give me permission. Feel me?",
					buttonNeutral: "Dawg, ion know",
					buttonNegative: "No dawg. Fuck outta here",
					buttonPositive: "Okay fam"
				}
			);
			console.log(granted);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use SMS features");
			} else {
				console.log("SMS permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	}

	NoPreviousTransactions() {
		return (
			<View>
				<Text>Oops! You don't have any recent withdrawal transaction.</Text>
			</View>
		)
	}

	render() {
		return (
			<ScrollView style={{ backgroundColor: '#D88F7F', height: '100%' }}>
				<Card title='All ATM Withdrawal' containerStyle={{ backgroundColor: '#DC7F6B' }}>
					<Text>
						Here, you see all the withdrawals you've made. When you make a withdrawal from the ATM, its automatically updated here.
					</Text>
					<Card>
						{this.state.withdrawalTransactions.length === 0 ? this.NoPreviousTransactions() : this.state.withdrawalTransactions.map((x, y) => {
							return (
								<ListItem key={y} title='Withdrawn &#8358;5000 from --JAIZ BANK.....' />
							)
						})}
					</Card>
				</Card>

				{this.state.withdrawalTransactions.length === 0 ? <TouchableOpacity style={styles.nextButton} onPress={async () => {
					ToastAndroid.show('You want to authorize and add new transactions', ToastAndroid.SHORT)
					await this.HandlePermissionAccess()
				}}>
					<Text style={{ color: 'white' }}>Authorize and Add transactions</Text>
				</TouchableOpacity> : <Text />}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	nextButton: {
		alignItems: 'center',
		backgroundColor: '#191413',
		padding: 10,
		marginTop: 30,
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0
	}
})
export default Welcome