import { createStackNavigator } from 'react-navigation'
import { Easing, Animated } from 'react-native'
import WelcomeComponent from './Welcome'
import HomeComponent from './Home'


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

export const NavigationConfig = () => {
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

export const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeComponent,
    header: null
  }
})

  export const WelcomeNavigator = createStackNavigator({
    Welcome: {
      screen: WelcomeComponent
    }
  })
