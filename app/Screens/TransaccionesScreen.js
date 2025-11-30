import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOOTER_HEIGHT = 72;

export default function TransaccionesScreen() {
  const [transacciones, setTransacciones] = useState([
    { id: '1', fecha: '2025-11-01', categoria: 'Salario', descripcion: 'Pago mensual', monto: 3000, tipo: 'ingreso' },
    { id: '2', fecha: '2025-11-02', categoria: 'Alimentación', descripcion: 'Supermercado', monto: -450, tipo: 'gasto' },
    { id: '3', fecha: '2025-11-03', categoria: 'Transporte', descripcion: 'Gasolina', monto: -120, tipo: 'gasto' },
    { id: '4', fecha: '2025-11-03', categoria: 'Entretenimiento', descripcion: 'Cine', monto: -80, tipo: 'gasto' },
  ]);

  // Estados para modales
  const [modalVisible, setModalVisible] = useState(false);
  const [modo, setModo] = useState(''); // "nuevo" o "actualizar"
  const [formData, setFormData] = useState({
    id: '',
    fecha: '',
    categoria: '',
    descripcion: '',
    monto: '',
    tipo: 'gasto',
  });

  const abrirModal = (modoAccion, transaccion = null) => {
    setModo(modoAccion);
    if (modoAccion === 'actualizar' && transaccion) {
      setFormData(transaccion);
    } else {
      setFormData({ id: Date.now().toString(), fecha: '', categoria: '', descripcion: '', monto: '', tipo: 'gasto' });
    }
    setModalVisible(true);
  };

  const guardarTransaccion = () => {
    if (modo === 'nuevo') {
      setTransacciones([...transacciones, { ...formData, monto: Number(formData.monto) }]);
    } else if (modo === 'actualizar') {
      setTransacciones(transacciones.map(t => (t.id === formData.id ? { ...formData, monto: Number(formData.monto) } : t)));
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={18} color="#0e620dff" />
          </View>
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingSmall}>TRANSACCIONES</Text>
          </View>
        </View>
      </View>

      {/* LISTA */}
      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => abrirModal('actualizar', item)}>
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
          </TouchableOpacity>
        )}
      />

      {/* BOTONES */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#00b140' }]}
          onPress={() => abrirModal('nuevo')}
        >
          <Text style={styles.buttonText}>NUEVA TRANSACCIÓN</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modo === 'nuevo' ? 'Agregar Transacción' : 'Actualizar Transacción'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Fecha (YYYY-MM-DD)"
              value={formData.fecha}
              onChangeText={(text) => setFormData({ ...formData, fecha: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Categoría"
              value={formData.categoria}
              onChangeText={(text) => setFormData({ ...formData, categoria: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={formData.descripcion}
              onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Monto"
              keyboardType="numeric"
              value={formData.monto.toString()}
              onChangeText={(text) => setFormData({ ...formData, monto: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#00b140' }]} onPress={guardarTransaccion}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#e74c3c' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#0e620dff', padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerGreeting: { justifyContent: 'center' },
  greetingSmall: { color: '#fff', fontSize: 16, fontWeight: '700', textTransform: 'uppercase' },
  transactionCard: { backgroundColor: '#fff', marginHorizontal: 20, marginTop: 12, borderRadius: 10, padding: 12, elevation: 3 },
  date: { fontSize: 12, color: '#666' },
  cardContent: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  category: { fontWeight: 'bold' },
  description: { color: '#666' },
  amount: { fontWeight: 'bold', fontSize: 16 },
  buttonsRow: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 16, marginBottom: FOOTER_HEIGHT + 12 },
  actionButton: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 12, textAlign: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
});