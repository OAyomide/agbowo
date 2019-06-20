import React, { Component } from 'react'
import { View, Picker, TouchableOpacity, StyleSheet, StatusBar, ToastAndroid } from 'react-native'
import { Card, Text, ListItem } from 'react-native-elements'


class SelectBank extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     header: null
  //   }
  // }
  constructor(props) {
    super(props)
    this.state = {
      selection: "",
      showNextButton: false
    }
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  renderNextButton() {
    return(
      <TouchableOpacity style={styles.nextButton}>
          <Text style={{fontSize: 20, color: 'black' }}>Next</Text>
        </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={{backgroundColor: "#816762", height: '100%'}}>
        <Card title="Select your bank"
        containerStyle={{ backgroundColor: "#B46E5F", marginTop: 300, borderColor: 'transparent' }}
        titleStyle={{color: 'white'}}
        >
          <Text>
            {this.state.selection === '' ? '' : `Your bank is: ${this.state.selection}`}
          </Text>
          <Picker
            selectedValue={this.state.selection}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === "") {
                this.setState({ showNextButton: false, selection: "" })
                ToastAndroid.show("Please select your bank", ToastAndroid.SHORT)
              } else {
                this.setState({ selection: itemValue, showNextButton: true })
              }
            }}>
            <Picker.Item label="None" value=""/>
            <Picker.Item label="Guarantee Trust Bank" value="GTBank" />
            <Picker.Item label="First Bank" value="FBN" />
            <Picker.Item label="Zenith Bank" value="Zenith Bank" />
          </Picker>
        </Card>

        {this.state.showNextButton ? this.renderNextButton() : <Text/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pickerStyle: {
    width: 100
  },
  nextButton: {
    alignItems: 'center',
    backgroundColor: '#816762',
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: '30%',
    right: 0,
    left: 0
  }
})
export default SelectBank