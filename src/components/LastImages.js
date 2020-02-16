import React  from 'react';
import { 
    StyleSheet,
    FlatList,
    View,
    Text
} from 'react-native';


export default class LastImages extends React.Component {

    constructor(props){
		super(props);
		process.nextTick = setImmediate;
        this.state = {
            data: [{
                id: 1,
                image: 'Teste',
                date: '2020-15-02'
            }]
        };
    }
    
    renderItens = ({item, index}) => {
        return (
            <View>
                <Text>{ item.id } - {item.image} -> {item.date}</Text>
            </View>     
        )
    };

    render() {
        return (
            <FlatList
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}           
                data={this.state.data}
                renderItem={this.renderItens}
                keyExtractor={item => (Math.ceil( (new Date()).getTime()) + item.id).toString() }   
            />
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
    },
});