import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function NuevoPresupuestoScreen() {
  const router = useRouter(); 

  const [cuenta, setCuenta] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleGuardarPresupuesto = () => {
    if (!cuenta || !monto || !categoria || !descripcion) {
        Alert.alert('Error', 'Por favor, rellena todos los campos.');
        return;
    }
    
    const nuevoPresupuesto = {
      cuenta,
      monto: `$${parseFloat(monto).toFixed(2)}`, 
      categoria,
      descripcion,
    };
    
    router.replace({ 
        pathname: '/presupuestos',
        params: { 
            nuevoPresupuesto: JSON.stringify(nuevoPresupuesto) 
        } 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>👤</Text> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NUEVO PRESUPUESTO</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔔</Text> 
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cuenta</Text>
          <TextInput
            style={styles.input}
            placeholder="Cuenta donde se aplicará"
            value={cuenta}
            onChangeText={setCuenta}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={styles.input}
            placeholder="$00.00"
            keyboardType="numeric"
            value={monto}
            onChangeText={setMonto}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoría</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Escuela, Comida, Renta"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción detallada del gasto o ingreso"
            multiline
            numberOfLines={4}
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>

        <TouchableOpacity style={styles.saveBudgetButton} onPress={handleGuardarPresupuesto}>
          <Text style={styles.saveBudgetButtonText}>GUARDAR PRESUPUESTO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6FCF97',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    elevation: 4,
  },
  iconButton: {
    padding: 5,
  },
  iconText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', 
    paddingVertical: 10,
  },
  saveBudgetButton: {
    backgroundColor: '#6FCF97',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30, 
    width: '80%',
    alignSelf: 'center',
  },
  saveBudgetButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});