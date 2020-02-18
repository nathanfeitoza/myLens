import React  from 'react';
import { StyleSheet, View } from 'react-native';
import Camera from '../components/Camera.js';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		process.nextTick = setImmediate;
	}

	render() {
		return (
			<View style={styles.container}>
				<Camera navigation={this.props.navigation} />
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