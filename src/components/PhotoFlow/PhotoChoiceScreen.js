import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PhotoChoiceScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/p_animation.gif')}  
        style={styles.animation}
        resizeMode="cover"
      />
      <Text style={styles.questionText}>
        Gostaria de finalizar o formulário registrando uma foto sua na cidade?
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.yesButton]}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.noButton]}
          onPress={() => navigation.navigate('ThankYouScreen')}
        >
          <Text style={styles.buttonText}>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 130, 
    height: 130, 
    marginBottom: 10
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    width: 120,
    padding: 10,
    backgroundColor: '#401505',
    borderRadius: 25,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#401505',
    width: '35%',
    right: 20,
  },
  noButton: {
    backgroundColor: '#686868',
    width: '35%',
    left: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default PhotoChoiceScreen;
