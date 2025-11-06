import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TransaccionesScreen({ navigation }) {
  const [transacciones, setTransacciones] = useState([
    { id: '1', fecha: '2025-11-01', categoria: 'Salario', descripcion: 'Pago mensual', monto: 3000, tipo: 'ingreso' },
    { id: '2', fecha: '2025-11-02', categoria: 'Alimentación', descripcion: 'Supermercado', monto: -450, tipo: 'gasto' },
    { id: '3', fecha: '2025-11-03', categoria: 'Transporte', descripcion: 'Gasolina', monto: -120, tipo: 'gasto' },
    { id: '4', fecha: '2025-11-03', categoria: 'Entretenimiento', descripcion: 'Cine', monto: -80, tipo: 'gasto' },
  ]);
const handleAccion = (accion) => 
  {
    Alert.alert('Acción realizada', `Se ${accion} una transacción.`);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Ionicons name="person-outline" size={28} color="white" />
        <Text style={styles.headerTitle}>TRANSACCIONES</Text>
        <Ionicons name="notifications-outline" size={28} color="white" />
      </View>

      
    <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#00b140' }]}
          onPress={() => handleAccion('creó')}
        >
        <Text style={styles.buttonText}>NUEVA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#f39c12' }]}
          onPress={() => handleAccion('actualizó')}
        >
        <Text style={styles.buttonText}>ACTUALIZAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}
          onPress={() => handleAccion('eliminó')}
        >
        <Text style={styles.buttonText}>ELIMINAR</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text style={styles.date}>{item.fecha}</Text>
            <View style={styles.cardContent}>
              <Ionicons
                name={item.tipo === 'ingreso' ? 'arrow-down-circle' : 'arrow-up-circle'}
                size={30}
                color={item.tipo === 'ingreso' ? 'green' : 'red'}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.category}>{item.categoria}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>
              </View>
              <Text
                style={[
                  styles.amount,
                  { color: item.tipo === 'ingreso' ? 'green' : 'red' },
                ]}
              >
                {item.tipo === 'ingreso' ? '+' : '-'}${Math.abs(item.monto).toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
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
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },

  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  newTransactionButton: {
    backgroundColor: '#00b140',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  newTransactionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  transactionCard: {
    backgroundColor: '#f9f9f9',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  date: { fontSize: 12, color: '#666' },
  cardContent: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  category: { fontWeight: 'bold' },
  description: { color: '#666' },
  amount: { fontWeight: 'bold', fontSize: 16 },
});
