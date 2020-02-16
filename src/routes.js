import React from 'react';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from "@react-navigation/stack";

import Home from './pages/Home';
import CaptureImage from './pages/CaptureImage';

const Stack = createStackNavigator();

const Navegacao = function () {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        options={{
            headerTitle: "MyLens",
            headerTitleAlign: "center",
            headerTransparent: true,
        }} 
        component={Home} />
      <Stack.Screen 
        name="CaptureImage"
        options={{
            headerTintColor: 'white',
            headerTitle: "",
            headerTitleAlign: "center",
            headerTransparent: true,
        }}
        component={CaptureImage} 
    />
    </Stack.Navigator>
  );
}

export default Navegacao;