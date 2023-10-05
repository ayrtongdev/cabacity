import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);
  }, []);

  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9C5AD' }}>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200 }} />
      </View>
    </View>
  );
};

export default SplashScreen;
