import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

import CaptureButton from './CaptureButton.js'

export default class Camera extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
			loading: false
		}
    }

    takePicture = async function() {
		
		if (this.camera) {

			// Pause the camera's preview
			this.camera.pausePreview();

            // Set the activity indicator
			this.setState((previousState, props) => ({
				loading: true
			}));
			
			// Set options
			const options = {
                base64: true
			};
			
			// Get the base64 version of the image
			try {
				this.camera.resumePreview();
				const data = await this.camera.takePictureAsync(options)
				
				// Get the identified image
				this.identifyImage(data.base64);
			} catch(err) {
				console.log('erro aqui', err)
			}
		}
	}

	identifyImage(imageData) {
		// Initialise Clarifai api
		const Clarifai = require('clarifai');
		const app = new Clarifai.App({
			apiKey: '1d42672a6ebf41ecad38801e6adabb98'
		});
		console.log(this.props)
		axios.post('https://scrapping-google.herokuapp.com/get_data_image', {
			imageBase64: imageData
		  })
		  .then((response) => {
			response.imageBase64 = imageData;
			this.redirectWhitData(response);
			console.log('é pra redirecionar');
			//console.log(response);
		  })
		  .catch(function (error) {
			console.log('deu erro nessa merda')
			console.log(error);
		  });

		// Identify the image
		/*app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData})
			.then((response) => {
				let resultados = '';
				response.outputs.forEach((element, index) => {
					resultados += `${index} - `;
					
					element.data.concepts.forEach(item => {
						resultados += `${item.name}`;
						resultados += `\n`;
					})

					resultados += `\n\n`;
				});
				return this.displayAnswer(resultados)
			})
			.catch((err) => alert(err));*/

	}

	redirectWhitData(data) {
		this.setState((prevState, props) => ({
			loading: false
		}));

		this.props.navigation.push('ImageData', {data: data})
	}

	displayAnswer(identifiedImage) {
		Alert.alert(
			'Resultados Encontrados',
			identifiedImage,
			[
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{cancelable: false},
		);
		
		this.setState((prevState, props) => ({
			loading: false
		}));
		
		this.camera.resumePreview();
	}
    
	render() {
		return (
            <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
            <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
                <CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
            </RNCamera>
		);
	}
}

const styles = StyleSheet.create({
    preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	loadingIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
