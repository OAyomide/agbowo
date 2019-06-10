import React, { Component } from 'react'
import { View, StyleSheet, Easing, Animated } from 'react-native'
import HomeComponent from './app/components/Home'
import WelcomeScreen from './app/components/Welcome'


import { createStackNavigator, createAppContainer } from 'react-navigation'


const FadeTransition = (index, position) => {
  const sceneRange = [index - 1, index]
  const outputOpacity = [0, 1]
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity
  });
  return {
    opacity: transition
  }
}

const NavigationConfig = () => {
  return {
    transitionSpec: {
      duration: 650,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (screenProps) => {
      const position = screenProps.position;
      const scene = screenProps.scene
      const index = scene.index

      return FadeTransition(index, position)
    }
  }
}


class App extends Component {
  static navigationOptions = {
    title: 'Agbowo Home',
    header: null
  }


  render() {
    return (
      <View>
        <HomeComponent/>
      </View>
    )
  }
}

const RootStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen
  },
  Home: {
    screen: HomeComponent,
  }
}, {
  initialRouteName: 'Home',
  transitionConfig: NavigationConfig
})

export default createAppContainer(RootStack)
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#322827',
  }
});
