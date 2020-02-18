import React from 'react';
import { 
	Dimensions,
	View,
	StyleSheet,
	Text,
	Button,
	ActivityIndicator,
	Image,
	FlatList,
	TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Card } from "react-native-elements";
import Modal from "react-native-modal";
import axios from 'axios';

import CaptureButton from './CaptureButton.js'

export default class Camera extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
			loading: false,
			imagePreview: false,
			visibleModal: false,
			dataImages: {}
		}
    }

    takePicture = async function() {
		
		if (this.camera) {

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
				
				const data = await this.camera.takePictureAsync(options)
				this.camera.pausePreview();
				// Get the identified image
				this.identifyImage(data.base64);
			} catch(err) {
				console.log('erro aqui', err)
			}
		}
	}

	identifyImage(imageData) {
		this.setState({
			imagePreview: imageData
		})

		axios.post('https://scrapping-google.herokuapp.com/get_data_image', {
			imageBase64: imageData
		  })
		  .then((response) => {
			response.imageBase64 = imageData;
			this.redirectWhitData(response);
		  })
		  .catch(function (error) {
			console.log('deu erro')
			console.log(error);
		  });

	}

	redirectWhitData(data) {
		this.camera.resumePreview();
		this.setState((prevState, props) => ({
			loading: false,
			dataImages: data.data,
			visibleModal: true
		}));
	}

	renderSimilarImages = ({ item, index }) => (
		<TouchableOpacity
			style={styles.containerListImages}
		>
			<Image           
            source={{uri: item}}    
            style={{ height: 72, width: 72, resizeMode: 'cover', borderRadius: 4}}                                      
          />
		</TouchableOpacity>
	);
	
	renderShopping = ({ item, index }) => (
		<TouchableOpacity
			style={styles.containerListImages}
		>
			<View style={styles.containerListShopping}>
				<View style={styles.containerImageShopping}>
					<Image           
					source={{uri: item.thumb}}    
					style={{ height: 72, width: 72, resizeMode: 'cover', borderRadius: 4}}                                                       
				/>
			</View>

			<View style={styles.containerDataShopping}>
				<View>
					<Text
						style={styles.textProductName}
				>{item.name}</Text>
				</View>
				
				<View>
					<Text
						style={styles.priceProduct}
					>{item.price}</Text>
				</View>
			</View>
		  </View>
		</TouchableOpacity>
	);
	
	getShopping = () => {
		if (this.state.dataImages.shopping != undefined) {
			if (this.state.dataImages.shopping.length == 0) {
				return (
					<View
						style={{
							paddingLeft: 15, 
						}}
					>
						<Text>Nenhum dado de shopping da imagem enviada</Text>
					</View>
				)
			}
		}

		return (
			<FlatList 
				vertical
				style={styles.shoppingList}
				pagingEnabled={false}
				showsHorizontalScrollIndicator={false}           
				data={this.state.dataImages.shopping}
				renderItem={this.renderShopping}
				keyExtractor={(item, index) => index.toString() }
			/>
		);
	}

	render() {
		return (
            <RNCamera captureAudio={false} ref={ref => {this.camera = ref;}} style={styles.preview}>
            <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
                <CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
				<Modal 
					testID={'modal'}
					isVisible={this.state.visibleModal}
					onSwipeComplete={() => {
						this.setState({
							visibleModal: false
						})
					}}
					swipeDirection={['down']}
					style={styles.modal}>
				<View style={{ flex: 1 }}>
					<View style={styles.containerLegend}>
						<Text style={styles.legend}>Imagens Similares</Text>
					</View>
					<FlatList 
						horizontal
						style={styles.similarImagesList}
						pagingEnabled={false}
						showsHorizontalScrollIndicator={false}           
						data={this.state.dataImages.images}
						renderItem={this.renderSimilarImages}
						keyExtractor={(item, index) => index.toString() }
					/>
					<View style={styles.containerLegend}>
						<Text style={styles.legend}>Shopping</Text>
					</View>
					{this.getShopping()}
				</View>
				</Modal>
            </RNCamera>
		);
	}
}

const styles = StyleSheet.create({
    preview: {
		flex: 1,
		alignSelf: 'stretch',
		// justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	loadingIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerLegend: {
		marginBottom: 20,
		marginTop: 10,
		paddingLeft: 10,
	},
	legend: {
		fontSize: 22,
		fontWeight: 'bold'
	},
	similarImagesList: {
		height: Dimensions.get('window').height * 0.2,
  		flexGrow: 0
	},
	shoppingList: {
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
  		flexGrow: 0,
		marginBottom: 10
	},
	containerListImages: {
		padding: 5,
		marginBottom: 0,
		height: 10,
		height: 100
	},
	containerListShopping: {
		flex: 1,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderBottomColor: '#ddd'
	},
	containerImageShopping: {
		paddingRight: 15
	},
	containerDataShopping: {
		marginTop: 5,
		flexDirection: 'column'
	},
	textProductName: {
		fontSize: 14,
		color: '#333'
	},
	priceProduct: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#444'
	},
	modal: {
		flex: 1,
		left: 0,
		paddingLeft: 0,
		marginLeft: 0,
		marginBottom: 0,
		marginTop: 55,
		justifyContent: 'flex-end',
		backgroundColor: 'white',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	}
});
