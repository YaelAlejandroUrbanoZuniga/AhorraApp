import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOOTER_HEIGHT = 72;

export default function PresupuestosScreen() {
  const [presupuestos] = useState([
    { id: '1', categoria: 'Comida', monto: 1500, usado: 600 },
    { id: '2', categoria: 'Transporte', monto: 800, usado: 250 },
    { id: '3', categoria: 'Entretenimiento', monto: 500, usado: 100 },
  ]);

  const handleAgregar = () => Alert.alert('Agregar Presupuesto', 'Aquí se agregará un nuevo presupuesto.');
  const handleModificar = () => Alert.alert('Modificar Presupuesto', 'Aquí podrás modificar un presupuesto existente.');
  const handleEliminar = () => Alert.alert('Eliminar Presupuesto', 'Aquí podrás eliminar un presupuesto existente.');

  return (
    <SafeAreaView style={styles.areaSegura}>

      {/* HEADER — igual que Ajustes/Transacciones */} 
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={18} color="#0e620dff" />
          </View>
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingSmall}>PRESUPUESTOS</Text>
          </View>
        </View>
      </View>

      {/* LISTA DE PRESUPUESTOS */}
      <FlatList
        data={presupuestos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + 120, paddingHorizontal: 20 }}
        renderItem={({ item }) => {
          const porcentaje = (item.usado / item.monto) * 100;
          const restante = item.monto - item.usado;

          return (
            <View style={styles.budgetCard}>
              <Text style={styles.category}>{item.categoria}</Text>

              <View style={styles.cardRow}>
                <Text style={styles.amount}>Presupuesto: ${item.monto.toFixed(2)}</Text>
                <Text style={styles.used}>Usado: ${item.usado.toFixed(2)}</Text>
              </View>

              <View style={styles.cardRow}>
                <Text style={styles.remaining}>Restante: ${restante.toFixed(2)}</Text>
                <Text style={styles.percentage}>{porcentaje.toFixed(0)}%</Text>
              </View>
            </View>
          );
        }}
      />

      {/* BOTONES ACCIÓN — iguales a Transacciones */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#00b140' }]}
          onPress={handleAgregar}
        >
          <Text style={styles.buttonText}>AGREGAR PRESUPUESTO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#f39c12' }]}
          onPress={handleModificar}
        >
          <Text style={styles.buttonText}>MODIFICAR PRESUPUESTO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}
          onPress={handleEliminar}
        >
          <Text style={styles.buttonText}>ELIMINAR PRESUPUESTO</Text>
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

  /* HEADER */
  header: {
    backgroundColor: '#0e620dff',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
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

  /* CARD PRESUPUESTO */
  budgetCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 3,
  },
  category: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0e620dff',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  amount: { fontWeight: '600', color: '#333' },
  used: { fontWeight: '600', color: '#f39c12' },
  remaining: { fontWeight: '600', color: '#0b6623' },
  percentage: { fontWeight: '700', color: '#777' },

  /* BOTONES */
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: FOOTER_HEIGHT + 12,
    textAlign: 'center',
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

  /* FOOTER */
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