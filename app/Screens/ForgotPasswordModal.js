import React, { useState } from 'react';
import { View,Text,StyleSheet,TextInput, Button, Modal} from 'react-native';


export default function OlvidarContraseña({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    if (email.trim() === '') {
      alert('Por favor ingresa tu correo.');
      return;
    }
    setIsCodeSent(true);
  };

  const handleClose = () => {
    setIsCodeSent(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.centeredView}>
      <View style={styles.sheet}>
        
        <Text style={styles.title}>Recuperar Contraseña</Text>

        {!isCodeSent ? (
          <>
            <Text style={styles.text}>
              Ingresa tu correo para recibir un código.
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#AAA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.buttonContainer}>
              <Button 
                title="Enviar Código" 
                color="#00C853" 
                onPress={handleSendCode} 
              />
            </View>
            
            
            <View style={{marginTop: 10}}>
                <Button title="Cancelar" color="gray" onPress={handleClose} />
            </View>
          </>
        ) : (
          
          <>
            <Text style={[styles.text, {fontWeight: 'bold', color: '#00C853'}]}>
              ¡Código enviado con éxito!
            </Text>
            <Text style={styles.text}>
              Revisa tu correo: {email}
            </Text>

            <View style={styles.buttonContainer}>
              <Button 
                title="Cerrar" 
                color="#00C853" 
                onPress={handleClose} 
              />
            </View>
          </>
        )}

      </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center', 
    margin: 20,
  },
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F7F7F7',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});