
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { NavigationActions, StackActions } from 'react-navigation'


const pinstructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

const instructions = `Track your spending without really doing much! The hardest part is allowing Agbowo read your messages! Don't worry, no data is collected and sent to an external server🙃`
export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Thanks for checking out Agbowo!</Text>
				<Text style={styles.instructions}>Electronic spending tracking done right!</Text>
				<Text style={styles.instructions}>{instructions}</Text>

				<TouchableOpacity style={styles.nextButton} onPress={() => this.props.navigation.navigate('Welcome')}>
					<Text style={{color: 'white'}}>Okay, Dope! 👍</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'Welcome'})]
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

	nextButton:{
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
