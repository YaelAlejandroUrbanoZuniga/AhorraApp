import React, { useState } from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOOTER_HEIGHT = 72;

export default function PresupuestosScreen({ navigation }) {

  const [presupuestos, setPresupuestos] = useState([
    { id: '1', categoria: 'Comida', monto: 1500, usado: 600 },
    { id: '2', categoria: 'Transporte', monto: 800, usado: 250 },
    { id: '3', categoria: 'Entretenimiento', monto: 500, usado: 100 },
  ]);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalModificar, setModalModificar] = useState(false);

  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [usado, setUsado] = useState('');

  const [presupuestoEditando, setPresupuestoEditando] = useState(null);

  const agregarPresupuesto = () => {
    if (!categoria || !monto) return;

    const nuevo = {
      id: Date.now().toString(),
      categoria,
      monto: parseFloat(monto),
      usado: parseFloat(usado || 0)
    };

    setPresupuestos([...presupuestos, nuevo]);
    setModalAgregar(false);
    setCategoria('');
    setMonto('');
    setUsado('');
  };

  const abrirModificar = (item) => {
    setPresupuestoEditando(item);
    setCategoria(item.categoria);
    setMonto(item.monto.toString());
    setUsado(item.usado.toString());
    setModalModificar(true);
  };

  const modificarPresupuesto = () => {
    if (!presupuestoEditando) return;

    const actualizado = {
      ...presupuestoEditando,
      categoria,
      monto: parseFloat(monto),
      usado: parseFloat(usado || 0),
    };

    setPresupuestos(
      presupuestos.map((p) =>
        p.id === presupuestoEditando.id ? actualizado : p
      )
    );

    setModalModificar(false);
    setPresupuestoEditando(null);
    setCategoria('');
    setMonto('');
    setUsado('');
  };

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

      <FlatList
        data={presupuestos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + 120, paddingHorizontal: 20 }}
        renderItem={({ item }) => {
          const porcentaje = (item.usado / item.monto) * 100;
          const restante = item.monto - item.usado;

          return (
            <TouchableOpacity onPress={() => abrirModificar(item)}>
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
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#00b140' }]}
          onPress={() => setModalAgregar(true)}
        >
          <Text style={styles.buttonText}>AGREGAR PRESUPUESTO</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalAgregar} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Agregar Presupuesto</Text>

            <TextInput
              placeholder="Categoría"
              style={styles.input}
              value={categoria}
              onChangeText={setCategoria}
            />

            <TextInput
              placeholder="Monto"
              style={styles.input}
              keyboardType="numeric"
              value={monto}
              onChangeText={setMonto}
            />

            <TextInput
              placeholder="Usado"
              style={styles.input}
              keyboardType="numeric"
              value={usado}
              onChangeText={setUsado}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={agregarPresupuesto}>
              <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalAgregar(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalModificar} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Modificar Presupuesto</Text>

            <TextInput
              placeholder="Categoría"
              style={styles.input}
              value={categoria}
              onChangeText={setCategoria}
            />

            <TextInput
              placeholder="Monto"
              style={styles.input}
              keyboardType="numeric"
              value={monto}
              onChangeText={setMonto}
            />

            <TextInput
              placeholder="Usado"
              style={styles.input}
              keyboardType="numeric"
              value={usado}
              onChangeText={setUsado}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={modificarPresupuesto}>
              <Text style={styles.saveText}>Actualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalModificar(false)}>
              <Text style={styles.cancelText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    alignItems: 'center' },
    avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerGreeting: { 
    justifyContent: 'center' 
  },
  greetingSmall: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

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
  amount: { 
    fontWeight: '600', 
    color: '#333' 
  },
  used: { 
    fontWeight: '600', 
    color: '#f39c12' 
  },
  remaining: {
    fontWeight: '600', 
    color: '#0b6623' 
  },
  percentage: { 
    fontWeight: '700', 
    color: '#777' 
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  saveBtn: {
    backgroundColor: '#00b140',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelBtn: {
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#444',
    fontWeight: 'bold',
  },
});