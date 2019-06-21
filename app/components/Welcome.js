
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image, StatusBar, ToolbarAndroid } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import Onboarding from 'react-native-onboarding-swiper'


const instructions = `Track your spending without really doing much!`
// The hardest part is allowing Agbowo read your messages! Don't worry, no data is collected and sent to an external server🙃
const resetAction = StackActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({
			routeName: "SelectBank"
		})
	]
});
export default class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isNew: false,
			pageIndex: 0
		}

		this.bootstrap()
	}

	async componentDidMount() {
		await AsyncStorage.setItem('isNew', 'true')
		StatusBar.setBarStyle('light-content', true)

		if (this.state.pageIndex === 0) {
			StatusBar.setBackgroundColor('#B46E5F', true)
		} else if (this.state.pageIndex === 1) {
			StatusBar.setBackgroundColor('#816762', true)
		}
	}

	componentDidUpdate() {
		StatusBar.setBarStyle('light-content', true)
		if (this.state.pageIndex === 0) {
			StatusBar.setBackgroundColor('#B46E5F', true)
		} else if (this.state.pageIndex === 1) {
			StatusBar.setBackgroundColor('#816762', true)
		}
	}
	bootstrap = async () => {
		const token = await AsyncStorage.getItem('isNew')
		if (!token) {
			this.props.navigation.dispatch(StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({
					routeName: "WelcomeLoading"
				})]
			}))
		}
		this.props.navigation.dispatch(StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({
				routeName: "App"
			})]
		}))
	}

	renderOnboardingScreens = () => {
		return (
			<View>
				<StatusBar barStyle="light-content" />
				<Onboarding
					onDone={() => {
						ToastAndroid.show('Welcome to Agbowo!', ToastAndroid.LONG)
						this.props.navigation.dispatch(resetAction);
					}}
					pageIndexCallback={this.getPageIndex}
					pages={[
						{
							backgroundColor: '#B46E5F',
							image: <Image source={require('../images/thanos.jpg')} style={{ height: 100, width: 100 }} />,
							title: 'E-spending tracking re-imagined!',
							subtitle: instructions
						},

						{
							backgroundColor: '#816762',
							image: <Image source={require('../images/thanos.jpg')} style={{ height: 100, width: 100 }} />,
							title: 'Know whats up!',
							subtitle: `The hardest part is allowing Agbowo read your messages!,
				
				
Dont worry, we'll take care of the rest`,
						}
					]}
				/>
			</View>
		)
	}

	getPageIndex = (index) => {
		console.log(`INDEX OF THE ONBOARD SCREEN IS::`, index)
		this.setState({
			pageIndex: index
		})
	}
	render() {
		return (
			<View style={styles.container}>
				{this.renderOnboardingScreens()}
			</View>
		);
	}
}


// const resetAction = StackActions.reset({
// 	index: 0,
// 	actions: [NavigationActions.navigate({ routeName: 'Welcome' })]
// });


const styles = StyleSheet.create({
	container: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#322827'
	},
	welcome: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: 'white',
		marginBottom: 5,
	},

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
});
