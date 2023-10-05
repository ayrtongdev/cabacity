import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

const translations = {

  label: {
    pt: 'Qual é o seu nome?',
    en: 'What is your name?',
    es: '¿Cuál es tu nombre?',
  },

  placeholder: {
    pt: 'Informe como você quer ser chamado',
    en: 'Tell us what you want to be called',
    es: 'Dinos cómo quieres que te llamemos',
  },

  continue: {
    pt: 'Continuar',
    en: 'Continue',
    es: 'Continuar',
  },

  error: {
    pt: 'Insira seu nome.',
    en: 'Enter your name.',
    es: 'Introduce tu nombre.',
  },

};



const NameScreen = ({ navigation, route }) => {
  const { language } = useLanguage();
  const [nome, setNome] = useState('');
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (!nome.trim()) {
      setShowError(true);
    } else {
      setShowError(false);
      navigation.navigate('Register', {
        nome: nome,
        language: language
      });
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.label}>{translations.label[language]}</Text>

        <TextInput
          style={[
            styles.input,
            showError ? styles.inputError : {} 
          ]}
          onChangeText={(text) => {
            setNome(text);
            if (showError) setShowError(false); 
          }}
          value={nome}
          placeholder={translations.placeholder[language]}
          placeholderTextColor="#777"
          underlineColorAndroid="transparent"
        />

        {showError && <Text style={styles.errorMessage}>{translations.error[language]}</Text>}


        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>{translations.continue[language]}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    width: '80%',
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#401505',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: -10,
  },
});

export default NameScreen;
