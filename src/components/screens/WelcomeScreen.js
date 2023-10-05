import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLanguage } from '../../context/LanguageContext';

const translations = {
  welcome: {
    pt: 'Bem vindo ao formulário de visitas de Cabaceiras!',
    en: 'Welcome to the Cabaceiras visit form!',
    es: '¡Bienvenido al formulario de visitas de Cabaceiras!',
  },
  start: {
    pt: 'Começar',
    en: 'Start',
    es: 'Comenzar',
  },
};

const languageInitials = {
  pt: 'PT',
  en: 'US',
  es: 'ES'
};


const LanguageSelector = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('pt');
  const containerHeight = useRef(new Animated.Value(60)).current;

  const flags = {
    pt: require('../../../assets/br.png'),
    en: require('../../../assets/us.png'),
    es: require('../../../assets/es.png')
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    onSelect(lang);
    setIsOpen(false);
  };

  Animated.timing(containerHeight, {
    toValue: isOpen ? 130 : 55,
    duration: 300,
    useNativeDriver: false,
  }).start();

  return (
    <Animated.View style={[styles.languageSelector, { height: containerHeight }]}>

      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Image source={flags[selectedLanguage]} style={styles.flagIcon} />
        <MaterialIcons name={isOpen ? "arrow-drop-up" : "arrow-drop-down"} size={30} color="black" />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <View style={{ height: 10 }} />
          {Object.keys(flags).filter(lang => lang !== selectedLanguage).map(lang => (
            <TouchableOpacity key={lang} onPress={() => handleLanguageChange(lang)} style={styles.languageOption}>
              <Image source={flags[lang]} style={styles.flagIcon} />
              <Text style={styles.languageInitial}>{languageInitials[lang]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

    </Animated.View>
  );
};


const WelcomeScreen = ({ navigation }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <LanguageSelector onSelect={setLanguage} />

      <View style={styles.backgroundContainer}>
        <Image source={require('../../../assets/fundo1.png')} style={styles.backgroundImage} />
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.logoImage} />
      </View>
      <Text style={styles.welcomeText}>{translations.welcome[language]}</Text>
      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DAA442', marginBottom: 27 }]}
          onPress={() => navigation.navigate('Name', { selectedLanguage: language })}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.buttonText, { textAlign: 'center' }]}>{translations.start[language]}</Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="arrow-forward" size={24} color="#000000" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40
  },

  logoImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain'
  },

  welcomeText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30
  },

  button: {
    marginTop: 0,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 35
  },

  iconContainer: { marginLeft: 10 },

  textContainer: {
    flex: 1,
    alignItems: 'center'
  },

  languageSelector: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
    overflow: 'hidden',
    width: 80,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  dropdown: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  flagIcon: {
    width: 35,
    height: 23,
    resizeMode: 'cover',
    marginRight: 5,
    marginTop: 4,
  },

  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  languageInitial: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'black'
  },

});

export default WelcomeScreen;
