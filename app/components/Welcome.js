
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import Onboarding from 'react-native-onboarding-swiper'


const instructions = `Track your spending without really doing much!`
// The hardest part is allowing Agbowo read your messages! Don't worry, no data is collected and sent to an external server🙃
const OnboardingScreens = () => {
	return (<Onboarding
		onDone={() => ToastAndroid.show('Welcome to Agbowo!', ToastAndroid.LONG)}
		pages={[
			{
				backgroundColor: '#0000',
				image: <Image source={require('../images/thanos.jpg')} style={{ height: 100, width: 100 }} />,
				title: 'E-spending re-imagined!',
				subtitle: instructions
			},

			{
				backgroundColor: 'black',
				image: <Image source={require('../images/thanos.jpg')} style={{height: 100, width: 100}}/>,
				title: 'Know whats up!',
				subtitle: 'The hardest part is allowing Agbowo read your messages!'
			}
		]}
	/>)
}

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isNew: false
		}

		this.bootstrap()
	}

	async componentDidMount() {
		await AsyncStorage.setItem('isNew', 'true')
	}

	bootstrap = async () => {
		const token = await AsyncStorage.getItem('isNew')
		// this.props.navigation.navigate(token ? 'Home' : 'Welcome')
	}


	render() {
		return (
			<View style={styles.container}>
				<OnboardingScreens />
			</View>
		);
	}
}

const resetAction = StackActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'Welcome' })]
});


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
