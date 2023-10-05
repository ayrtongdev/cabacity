// PreviewScreen.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const PreviewScreen = ({ route, navigation }) => {
  const { imageUri } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text>Esta foto ficou boa?</Text>
      <Button title="Sim" onPress={() => {
        // aprovar foto
      }} />
      <Button title="Não" onPress={() => {
        // retornar para tirar a foto novamente
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '50%',
    marginBottom: 20,
  },
});

export default PreviewScreen;
