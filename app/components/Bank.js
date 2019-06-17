import React, { Component } from 'react'
import { View, Picker } from 'react-native'

class SelectBank extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selection: ""
		}
	}
    render() {
			return (
				<View>
					<Picker
					selectedValue={this.state.selection}
					style={{height: 50, width: 100}}
					onValueChange={(itemValue, itemIndex) => {
						this.setState({ selection: itemValue})
					}}>
						<Picker.Item label="GT. Bank" value="GTBank"/>
						<Picker.Item label="First Bank" value="FBN"/>
						<Picker.Item label="Zenith Bank" value="Zenith Bank"/>
					</Picker>
				</View>
			)
		}
}

export default SelectBank