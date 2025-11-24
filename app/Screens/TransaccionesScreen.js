import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOOTER_HEIGHT = 72;

export default function TransaccionesScreen() {
  const [transacciones] = useState([
    { id: '1', fecha: '2025-11-01', categoria: 'Salario', descripcion: 'Pago mensual', monto: 3000, tipo: 'ingreso' },
    { id: '2', fecha: '2025-11-02', categoria: 'Alimentación', descripcion: 'Supermercado', monto: -450, tipo: 'gasto' },
    { id: '3', fecha: '2025-11-03', categoria: 'Transporte', descripcion: 'Gasolina', monto: -120, tipo: 'gasto' },
    { id: '4', fecha: '2025-11-03', categoria: 'Entretenimiento', descripcion: 'Cine', monto: -80, tipo: 'gasto' },
  ]);

  const handleAccion = (accion) => {
    Alert.alert('Acción realizada', `Se ${accion} una transacción.`);
  };

  return (
    <SafeAreaView style={styles.areaSegura}>

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={18} color="#0e620dff" />
          </View>
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingSmall}>TRANSACCIONES</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bellButton} activeOpacity={0.8} onPress={() => navigation.navigate("Notificaciones")}>
          <Ionicons name="notifications" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + 120 }}
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

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#00b140' }]}
          onPress={() => handleAccion('creó')}
        >
          <Text style={styles.buttonText}>NUEVA TRANSACCIÓN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#f39c12' }]}
          onPress={() => handleAccion('actualizó')}
        >
          <Text style={styles.buttonText}>ACTUALIZAR TRANSACCIÓN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}
          onPress={() => handleAccion('eliminó')}
        >
          <Text style={styles.buttonText}>ELIMINAR TRANSACCIÓN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    backgroundColor: '#0e620dff',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerGreeting: { justifyContent: 'center' },
  greetingSmall: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0b4f10',
    alignItems: 'center',
    justifyContent: 'center',
  },

  transactionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    padding: 12,
    elevation: 3,
  },
  date: { fontSize: 12, color: '#666' },
  cardContent: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  category: { fontWeight: 'bold' },
  description: { color: '#666' },
  amount: { fontWeight: 'bold', fontSize: 16 },

  /* BOTONES */
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: FOOTER_HEIGHT + 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
    textAlign: 'center',
  },

  piePagina: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  itemPiePagina: { alignItems: 'center' },
  textoPiePagina: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  textoPiePaginaActivo: {
    color: '#0e620dff',
    fontWeight: '800',
  },
});