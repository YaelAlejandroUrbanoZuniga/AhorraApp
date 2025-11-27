import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOOTER_HEIGHT = 72;

export default function TransaccionesScreen({ navigation }) {
  const [transacciones, setTransacciones] = useState([
    { id: '1', fecha: '2025-11-01', categoria: 'Salario', descripcion: 'Pago mensual', monto: 3000, tipo: 'ingreso' },
    { id: '2', fecha: '2025-11-02', categoria: 'Alimentación', descripcion: 'Supermercado', monto: -450, tipo: 'gasto' },
    { id: '3', fecha: '2025-11-03', categoria: 'Transporte', descripcion: 'Gasolina', monto: -120, tipo: 'gasto' },
    { id: '4', fecha: '2025-11-03', categoria: 'Entretenimiento', descripcion: 'Cine', monto: -80, tipo: 'gasto' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const abrirModal = (item) => {
    setEditItem({ ...item });
    setModalVisible(true);
  };

  const actualizarTransaccion = () => {
    setTransacciones((prev) =>
      prev.map((t) => (t.id === editItem.id ? editItem : t))
    );
    setModalVisible(false);
  };

   const eliminarTransaccion = (id) => {
    Alert.alert(
      'Eliminar',
      '¿Seguro que quieres eliminar esta transacción?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () =>
            setTransacciones((prev) => prev.filter((t) => t.id !== id)),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.areaSegura}>

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={18} color="#0e620dff" />
          </View>
          <Text style={styles.greetingSmall}>TRANSACCIONES</Text>
        </View>
      </View>

      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => abrirModal(item)}
            onLongPress={() => eliminarTransaccion(item.id)}
            style={styles.transactionCard}
          >
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
          </TouchableOpacity>
        )}
      />


      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#00b140' }]}
          onPress={() => navigation.navigate('NuevaTransaccion')}
        >
          <Text style={styles.buttonText}>NUEVA</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>Actualizar Transacción</Text>

            <TextInput
              style={styles.input}
              placeholder="Categoría"
              placeholderTextColor="#555"
              value={editItem?.categoria}
              onChangeText={(text) => setEditItem({ ...editItem, categoria: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Descripción"
              placeholderTextColor="#555"
              value={editItem?.descripcion}
              onChangeText={(text) => setEditItem({ ...editItem, descripcion: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Monto"
              placeholderTextColor="#555"
              keyboardType="numeric"
              value={String(editItem?.monto)}
              onChangeText={(text) => setEditItem({ ...editItem, monto: Number(text) })}
            />

            <TouchableOpacity style={styles.saveButton} onPress={actualizarTransaccion}>
              <Text style={styles.saveText}>Guardar Cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
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
    backgroundColor: '#f5f5f5' 
  },
  header: {
    backgroundColor: '#0e620dff',
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { 
   flexDirection: 'row', 
   alignItems: 'center' 
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
  greetingSmall: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '700' 
  },

  transactionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    padding: 12,
    elevation: 3,
  },
  date: { 
    fontSize: 12, 
    color: '#666' 
  },
  cardContent: { 
    flexDirection: 'row',
    alignItems: 'center', 
    marginTop: 5
  },
  category: { 
    fontWeight: 'bold' 
  },
  description: { 
    color: '#666' 
  },
  amount: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: FOOTER_HEIGHT + 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 10 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#00b140',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  saveText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  cancelText: { 
    textAlign: 'center', 
    fontWeight: '700' },
});
