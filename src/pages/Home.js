import React from 'react';
import { 
    StyleSheet,
    View,
    TouchableHighlight,
    Button,
    Text,
    Dimensions
} from 'react-native';

import LastImages from '../components/LastImages';

function App({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.containerLastImages}>
                <Text>Última imagens Analisadas</Text>
                <LastImages />
            </View>

            <View style={styles.containerLastButton}>
                <TouchableHighlight style={styles.initButton}>
                    <Button 
                        onPress={() => {
                            navigation.push('CaptureImage');
                        }}
                        title="Init" 
                    />
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
    },
    containerLastImages: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: Dimensions.get('window').height * 0.1,
    },  
    containerLastButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: Dimensions.get('window').height * 0.2,
    },  
    initButton: {
        marginBottom: 30,
		width: 160,
		borderRadius: 10,
		backgroundColor: "white",
    }
});

export default App;