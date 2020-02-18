import React from 'react';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from "@react-navigation/stack";

import Home from './pages/Home';

const Stack = createStackNavigator();

const Navegacao = function () {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        options={{
            headerTintColor: 'white',
            headerTitle: "MyLens",
            headerTitleAlign: "center",
            headerTransparent: true,
        }} 
        component={Home} />
    </Stack.Navigator>
  );
}

export default Navegacao;