import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../components/screens/SplashScreen';
import WelcomeScreen from '../components/screens/WelcomeScreen';
import NameScreen from '../components/screens/NameScreen';
import RegisterScreen from '../components/screens/RegisterScreen'
import PhotoChoiceScreen from '../components/PhotoFlow/PhotoChoiceScreen';
import PreviewScreen from '../components/PhotoFlow/PreviewScreen';
import CameraScreen from '../components/PhotoFlow/CameraScreen';

const Stack = createStackNavigator();

const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  


const AppNavigation = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Name" component={NameScreen} />
                <Stack.Screen 
                  name="Register" 
                  component={RegisterScreen} 
                  options={horizontalAnimation}
                />
                <Stack.Screen name="PhotoChoice" component={PhotoChoiceScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
                <Stack.Screen name="Preview" component={PreviewScreen} />
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default AppNavigation;
