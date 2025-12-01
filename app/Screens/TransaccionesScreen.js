// screens/TransaccionesScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatabaseService from '../database/DatabaseService';

const FOOTER_HEIGHT = 72;

export default function TransaccionesScreen() {
  const [transacciones, setTransacciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modo, setModo] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    fecha: '',
    categoria: '',
    descripcion: '',
    monto: '',
    tipo: 'gasto',
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        await DatabaseService.initialize();
        const datos = await DatabaseService.getAll();
        setTransacciones(Array.isArray(datos) ? datos : []);
      } catch (error) {
        console.log('Error cargando datos:', error);
      }
    };
    cargarDatos();
  }, []);

  const abrirModal = (modoAccion, transaccion = null) => {
    setModo(modoAccion);
    if (modoAccion === 'actualizar' && transaccion) {
      setFormData({
        id: transaccion.id,
        fecha: transaccion.fecha ?? '',
        categoria: transaccion.categoria ?? '',
        descripcion: transaccion.descripcion ?? '',
        monto: String(transaccion.monto ?? ''),
        tipo: transaccion.tipo ?? 'gasto',
      });
    } else {
      setFormData({
        id: Date.now().toString(),
        fecha: '',
        categoria: '',
        descripcion: '',
        monto: '',
        tipo: 'gasto',
      });
    }
    setModalVisible(true);
  };

  const guardarTransaccion = async () => {
    try {
      const nueva = {
        ...formData,
        monto: Number(formData.monto || 0),
      };
      if (modo === 'nuevo') {
        await DatabaseService.add(nueva);
      } else {
        await DatabaseService.update(nueva);
      }
      const actualizadas = await DatabaseService.getAll();
      setTransacciones(Array.isArray(actualizadas) ? actualizadas : []);
      setModalVisible(false);
    } catch (e) {
      console.log('Error guardando transacción:', e);
    }
  };

  const eliminarTransaccion = () => {
    Alert.alert(
      '¿Eliminar transacción?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await DatabaseService.remove(formData.id);
              const actualizadas = await DatabaseService.getAll();
              setTransacciones(Array.isArray(actualizadas) ? actualizadas : []);
              setModalVisible(false);
            } catch (e) {
              console.log('Error eliminando transacción:', e);
            }
          },
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
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingSmall}>TRANSACCIONES</Text>
          </View>
        </View>
      </View>

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
                  color={item.tipo === 'ingreso' ? '#2e7d32' : '#c62828'}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.category}>{item.categoria}</Text>
                  <Text style={styles.description}>{item.descripcion}</Text>
                </View>
                <Text style={[styles.amount, { color: item.tipo === 'ingreso' ? '#2e7d32' : '#c62828' }]}>
                  {item.tipo === 'ingreso' ? '+' : '-'}${Math.abs(Number(item.monto) || 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#00b140' }]}
          onPress={() => abrirModal('nuevo')}
        >
          <Text style={styles.buttonText}>NUEVA TRANSACCIÓN</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
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
                  value={String(formData.monto || '')}
                  onChangeText={(text) => setFormData({ ...formData, monto: text })}
                />

                <View style={styles.tipoRow}>
                  <TouchableOpacity
                    style={[
                      styles.tipoButton,
                      formData.tipo === 'ingreso' && { backgroundColor: '#a8e6cf' },
                    ]}
                    onPress={() => setFormData({ ...formData, tipo: 'ingreso' })}
                  >
                    <Text style={styles.tipoText}>Ingreso</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tipoButton,
                      formData.tipo === 'gasto' && { backgroundColor: '#ff8b94' },
                    ]}
                    onPress={() => setFormData({ ...formData, tipo: 'gasto' })}
                  >
                    <Text style={styles.tipoText}>Gasto</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#00b140' }]}
                    onPress={guardarTransaccion}
                  >
                    <Text style={styles.buttonText}>Guardar</Text>
                  </TouchableOpacity>

                  {modo === 'actualizar' && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}
                      onPress={eliminarTransaccion}
                    >
                      <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#999' }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#0e620dff',
    padding: 14,
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
  greetingSmall: { color: '#fff', fontSize: 16, fontWeight: '700', textTransform: 'uppercase' },
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
  date: { 
    fontSize: 12,
    color: '#666' 
  },
  cardContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5 },
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
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 12, textAlign: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },

  // Botones del modal
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },

  // Selector ingreso/gasto
  tipoRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  tipoButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  tipoText: { color: '#333', fontWeight: 'bold' },
  tipoRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 10,
  marginBottom: 10,
},
tipoButton: {
  flex: 1,
  paddingVertical: 10,
  marginHorizontal: 5,
  borderRadius: 10,
  backgroundColor: '#ccc',
  alignItems: 'center',
},
tipoText: {
  color: '#333',
  fontWeight: 'bold',
},
keyboardView: {
  flex: 1,
  justifyContent: 'center',
},
scrollContent: {
  flexGrow: 1,
  justifyContent: 'center',
},
});