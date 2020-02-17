import React  from 'react';
import { StyleSheet, View } from 'react-native';

export default class App extends React.Component {

	constructor(props) {
		super(props);
        process.nextTick = setImmediate;
        console.log(props.navigation.params)
	}

	render() {
		return (
			<View style={styles.container}>
		 	</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',	
	}
});