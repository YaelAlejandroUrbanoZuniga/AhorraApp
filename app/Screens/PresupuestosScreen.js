import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PresupuestosScreen() 
{
const handleAgregar = () => {
    Alert.alert('Agregar Presupuesto', 'Aquí se agregará un nuevo presupuesto.');
  };

  const handleModificar = () => {
    Alert.alert('Modificar Presupuesto', 'Aquí podrás modificar un presupuesto existente.');
  };

  const handleEliminar = () => {
    Alert.alert('Eliminar Presupuesto', 'Aquí podrás eliminar un presupuesto existente.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="person-outline" size={28} color="white" />
        <Text style={styles.headerTitle}>PRESUPUESTOS</Text>
        <Ionicons name="notifications-outline" size={28} color="white" />
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleAgregar}>
          <Ionicons name="add-circle-outline" size={28} color="white" />
          <Text style={styles.buttonText}>AGREGAR PRESUPUESTO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleModificar}>
          <Ionicons name="create-outline" size={28} color="white" />
          <Text style={styles.buttonText}>MODIFICAR PRESUPUESTO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleEliminar}>
          <Ionicons name="trash-outline" size={28} color="white" />
          <Text style={styles.buttonText}>ELIMINAR PRESUPUESTO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#006400',
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b140',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});