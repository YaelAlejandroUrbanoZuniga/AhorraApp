import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default function AjustesScreen() {
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>👤 🔔</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>AJUSTES</Text>

      {/* Botones principales */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.buttonText}>CUENTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.buttonText}>ACCESIBILIDAD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.buttonText}>AYUDA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton}>
          <Text style={styles.buttonText}>SALIR</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <Button title="MOVIMIENTOS" color="#ff0080" onPress={() => {}} />
        <Button title="INICIO" color="#ff0080" onPress={() => {}} />
        <Button title="AJUSTES" color="#ff0080" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ffe6',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    width: '100%',
  },
});
