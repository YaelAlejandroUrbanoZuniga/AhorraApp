import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Linking } from 'react-native'; // Importamos Linking
import Modal from 'react-native-modal';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function ForgotPasswordModal({ isVisible, onClose }) {
  const [email, setEmail] = useState('');
  
  // Función para enviar correo real usando la app del usuario
  const handleSendCode = async () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu correo.');
      return;
    }

    // Verificar si el usuario existe en la BD local antes de enviar
    const usuario = await controller.verificarEmailParaRecuperacion(email);

    if (usuario) {
      // Si el usuario existe, abrimos la app de correo
      const asunto = "Recuperación de Contraseña - AhorraApp";
      const cuerpo = `Hola ${usuario.nombre},\n\nTu contraseña es: ${usuario.password}\n\nPor favor, cámbiala después de iniciar sesión.`;
      
      // Creamos la URL mailto
      const url = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

      // Intentamos abrir la app de correo
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
        onClose(); // Cerramos el modal
      } else {
        Alert.alert('Error', 'No se pudo abrir la aplicación de correo.');
      }
    } else {
      Alert.alert('Error', 'Este correo no está registrado en la aplicación.');
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal} backdropColor="black" backdropOpacity={0.5}>
      <View style={styles.sheet}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <Text style={styles.text}>Ingresa tu correo para recuperar tu contraseña.</Text>
        
        <TextInput 
            style={styles.input} 
            placeholder="ejemplo@correo.com" 
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none"
        />
        
        <View style={styles.buttonContainer}>
            <Button title="Enviar Correo" color="#0e620dff" onPress={handleSendCode} />
        </View>
        
        <View style={{marginTop: 10, width: '100%'}}>
            <Button title="Cancelar" color="gray" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { justifyContent: 'center', margin: 20 },
  sheet: { backgroundColor: 'white', padding: 30, borderRadius: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  text: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', height: 50, backgroundColor: '#F7F7F7', borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 20, color: '#333' },
  buttonContainer: { width: '100%', marginTop: 10, borderRadius: 8, overflow: 'hidden' },
});