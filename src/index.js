import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navegacao from './routes';
//StatusBar.setBackgroundColor(COLORS.principal);
//console.disableYellowBox = true;
const App = () => <NavigationContainer><Navegacao /></NavigationContainer>;

export default App;