import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import countries from '../../locations/countries.json';
import data from '../../locations/data.json';



const translations = {
  header: {
    pt: 'Olá, {nome}! Por favor, preencha os campos abaixo:',
    en: 'Hello, {nome}! Please fill out the fields below:',
    es: '¡Hola, {nome}! Por favor, completa los campos a continuación:',
  },
  country: {
    pt: 'País:',
    en: 'Country:',
    es: 'País:',
  },
  state: {
    pt: 'Estado:',
    en: 'State:',
    es: 'Estado:',
  },
  city: {
    pt: 'Cidade de Origem:',
    en: 'City of Origin:',
    es: 'Ciudad de Origen:',
  },
  email: {
    pt: 'E-mail:',
    en: 'E-mail:',
    es: 'E-mail:',
  },
  reason: {
    pt: 'Motivo da Visita:',
    en: 'Reason for Visit:',
    es: 'Motivo de la Visita:',
  },
  next: {
    pt: 'Próximo',
    en: 'Next',
    es: 'Siguiente',
  },
  error: {
    pt: {
      emptyEmail: 'Insira seu e-mail.',
      invalidEmail: 'E-mail inválido.',
      emptyReason: 'Insira o motivo da visita.'
    },
    en: {
      emptyEmail: 'Enter your email.',
      invalidEmail: 'Invalid email.',
      emptyReason: 'Enter the reason for visit.'
    },
    es: {
      emptyEmail: 'Ingrese su correo electrónico.',
      invalidEmail: 'Correo electrónico no válido.',
      emptyReason: 'Ingrese el motivo de la visita.'
    }
  }

};

const RegisterScreen = ({ route, navigation }) => {
  const { nome, language } = route.params;

  const initialCountryName = language === 'pt' ? 'Brasil' : countries.find(c => c.sigla === 'BR')?.nome_pais_int || 'Brasil';

  const [pais, setPais] = useState(initialCountryName);
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');
  const [emailError, setEmailError] = useState('');
  const [motivoError, setMotivoError] = useState('');


  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleContinue = async () => {
    if (!email) {
      setEmailError(translations.error[language].emptyEmail);
    } else if (!isValidEmail(email)) {
      setEmailError(translations.error[language].invalidEmail);
    } else {
      setEmailError('');
    }

    if (!motivo) {
      setMotivoError(translations.error[language].emptyReason);
    } else {
      setMotivoError('');
    }

    if (email && isValidEmail(email) && motivo) {
      try {
        const response = await fetch('http://192.168.18.12:5000/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            pais: pais,
            estado: estado,
            cidade: cidade,
            motivo: motivo
          }),
        });

        const data = await response.json();

        if (response.status === 201) {
          console.log("User registered:", data);
          navigation.navigate('PhotoChoice');
        } else {
          console.error("Failed to register:", data);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };



  const isBrasil = countries.find(c => (language === 'pt' ? c.nome_pais : c.nome_pais_int) === pais)?.sigla === 'BR';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{translations.header[language].replace('{nome}', nome)}</Text>

      <Text style={styles.label}>{translations.country[language]}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.picker}
          selectedValue={pais}
          onValueChange={(itemValue) => setPais(itemValue)}
        >
          {countries.map((country) => (
            <Picker.Item
              key={country.sigla}
              label={language === 'pt' ? country.nome_pais : country.nome_pais_int}
              value={language === 'pt' ? country.nome_pais : country.nome_pais_int}
            />
          ))}
        </Picker>
      </View>

      {isBrasil && (
        <>
          <Text style={styles.label}>{translations.state[language]}</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              selectedValue={estado}
              onValueChange={(itemValue) => setEstado(itemValue)}
            >
              {data.estados.map((estadoItem) => (
                <Picker.Item key={estadoItem.sigla} label={estadoItem.nome} value={estadoItem.nome} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>{translations.city[language]}</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              selectedValue={cidade}
              onValueChange={(itemValue) => setCidade(itemValue)}
            >
              {data.estados.find(est => est.nome === estado)?.cidades.map((cidade) => (
                <Picker.Item key={cidade} label={cidade} value={cidade} />
              ))}
            </Picker>
          </View>
        </>
      )}

      <Text style={styles.label}>{translations.email[language]}</Text>
      <TextInput
        style={[styles.input, emailError ? { borderColor: 'red' } : {}]}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (emailError) setEmailError(null);
        }}
        keyboardType="email-address"
      />
      {emailError ? <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}

      <Text style={styles.label}>{translations.reason[language]}</Text>
      <TextInput
        style={[styles.reasonInput, motivoError ? { borderColor: 'red' } : {}]}
        value={motivo}
        onChangeText={(text) => {
          setMotivo(text);
          if (motivoError) setMotivoError(null);
        }}
        multiline={true}
        maxLength={200}
        textAlignVertical='top'
      />
      {motivoError ? <Text style={{ color: 'red', marginBottom: 10 }}>{motivoError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>{translations.next[language]}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    marginTop: 50,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    height: 40,
  },

  reasonInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    height: 90, 
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

  pickerWrapper: {
    backgroundColor: '#FFFFFF',
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    height: 40,
    justifyContent: 'center',
  },

  picker: {
    width: '100%',
    height: '100%',
    padding: 10,
    fontSize: 16,
  },

});

export default RegisterScreen;
