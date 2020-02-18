import React  from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default class CaptureButton extends React.Component {
	render() {
		return (
			<TouchableHighlight 
				style={styles.captureButton} 
				onPress={this.props.onClick}
				disabled={this.props.buttonDisabled}>
				<Text></Text>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	captureButton: {
		padding: 5,
		height: 80,
		width: 80,  //The Width must be the same as the height
		borderRadius:400, //Then Make the Border Radius twice the size of width or Height   
		backgroundColor:'white',
		marginBottom: 20,
		borderBottomColor: 'rgb(195, 125, 198)',
		borderColor: 'rgb(195, 125, 198)',
		borderWidth: 8
	}
});
