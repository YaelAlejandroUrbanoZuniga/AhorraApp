import React, { useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { agregarPresupuestoDB, obtenerPresupuestosDB, editarPresupuestoDB, eliminarPresupuestoDB } from '../services/PresupuestoService';

const FOOTER_HEIGHT = 72;

export default function PresupuestosScreen({ navigation }) {

  const [presupuestos, setPresupuestos] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalModificar, setModalModificar] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [usado, setUsado] = useState('');
  const [presupuestoEditando, setPresupuestoEditando] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  
  useEffect(() => {
    cargarPresupuestos(); // MODIFICADO: carga inicial desde BD
  }, []);

  const cargarPresupuestos = (categoriaFiltro = filtroCategoria, fechaFiltro = filtroFecha) => {
    obtenerPresupuestosDB(
      categoriaFiltro ? categoriaFiltro.trim() : '',
      fechaFiltro ? fechaFiltro.trim() : '',
      (rows) => {
        // rows es un array de objetos { id, categoria, monto, usado, fecha }
        setPresupuestos(rows);
      }
    );
  };

  const agregarPresupuesto = () => {
    if (!categoria || !monto) {
      Alert.alert('Falta información', 'La categoría y el monto son obligatorios.');
      return;
    }
    const montoNum = parseFloat(monto);
    const usadoNum = parseFloat(usado || '0');

    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert('Monto inválido', 'Ingresa un monto válido mayor que 0.');
      return;
    }

    const fechaAuto = new Date().toISOString().slice(0, 10);
    agregarPresupuestoDB(categoria.trim(), montoNum, usadoNum, fechaAuto, (insertId) => {
      cargarPresupuestos();
      setModalAgregar(false);
      setCategoria('');
      setMonto('');
      setUsado('');
    });
  };


    const abrirModificar = (item) => {
    setPresupuestoEditando(item);
    setCategoria(item.categoria);
    setMonto(item.monto.toString());
    setUsado(item.usado != null ? item.usado.toString() : '0');
    setModalModificar(true);
  };

  const modificarPresupuesto = () => {
    if (!presupuestoEditando) return;

    if (!categoria.trim() || !monto) {
      Alert.alert('Falta información', 'La categoría y el monto son obligatorios.');
      return;
    }

    const montoNum = parseFloat(monto);
    const usadoNum = parseFloat(usado || '0');

    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert('Monto inválido', 'Ingresa un monto válido mayor que 0.');
      return;
    }

    editarPresupuestoDB(
      presupuestoEditando.id,
      categoria.trim(),
      montoNum,
      usadoNum,
      presupuestoEditando.fecha,
      (result) => {
        // recargar lista y limpiar
        cargarPresupuestos();
        setModalModificar(false);
        setPresupuestoEditando(null);
        setCategoria('');
        setMonto('');
        setUsado('');
      }
    );
  };

  const confirmarEliminar = (id) => {
    Alert.alert('Eliminar presupuesto', '¿Seguro que deseas eliminar este presupuesto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          eliminarPresupuestoDB(id, (res) => {
            cargarPresupuestos();
          });
        },
      },
    ]);
  };

  const aplicarFiltros = () => {
    cargarPresupuestos(filtroCategoria, filtroFecha);
  };

  const limpiarFiltros = () => {
    setFiltroCategoria('');
    setFiltroFecha('');
    cargarPresupuestos('', '');
  };

  const renderItem = ({ item }) => {
    // proteger contra división por cero y datos inválidos
    const montoNum = parseFloat(item.monto) || 0;
    const usadoNum = parseFloat(item.usado) || 0;
    const porcentaje = montoNum > 0 ? (usadoNum / montoNum) * 100 : 0;
    const restante = montoNum - usadoNum;

    return (
      <TouchableOpacity onPress={() => abrirModificar(item)}>
        <View style={styles.budgetCard}>
          <Text style={styles.category}>{item.categoria}</Text>

          <View style={styles.cardRow}>
            <Text style={styles.amount}>Presupuesto: ${montoNum.toFixed(2)}</Text>
            <Text style={styles.used}>Usado: ${usadoNum.toFixed(2)}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.remaining}>Restante: ${restante.toFixed(2)}</Text>
            <Text style={styles.percentage}>{porcentaje.toFixed(0)}%</Text>
          </View>

          {/* Mostrar fecha (MODIFICADO: mostramos la fecha guardada automáticamente) */}
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 12, color: '#666' }}>Fecha: {item.fecha}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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

      <View style={styles.filterRow}>
        <TextInput
          placeholder="Filtrar por categoría"
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          value={filtroCategoria}
          onChangeText={setFiltroCategoria}
        />
        <TextInput
          placeholder="Filtrar por fecha (YYYY-MM-DD)"
          style={[styles.input, { width: 150 }]}
          value={filtroFecha}
          onChangeText={setFiltroFecha}
        />
      </View>

      <View style={{ flexDirection: 'row', 
                     paddingHorizontal: 20, 
                     marginBottom: 8 }}>
        <TouchableOpacity style={styles.filtrarBtn} onPress={aplicarFiltros}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>APLICAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filtrarBtn, { 
                                  backgroundColor: '#ccc',
                                  marginLeft: 8 }]} 
                                  onPress={limpiarFiltros}>
          <Text style={{ color: '#333', fontWeight: '700' }}>LIMPIAR</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={presupuestos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + 120, paddingHorizontal: 20 }}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>No hay presupuestos.</Text>
          </View>
        }
      />

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#00b140' }]}
          onPress={() => {
            // Abrir modal de agregar (limpiar campos primero)
            setCategoria('');
            setMonto('');
            setUsado('');
            setModalAgregar(true);
          }}
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
              placeholder="Usado (opcional)"
              style={styles.input}
              keyboardType="numeric"
              value={usado}
              onChangeText={setUsado}
            />
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ color: '#666' }}>
                Fecha (se asigna automáticamente): {new Date().toISOString().slice(0, 10)}
              </Text>
            </View>

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


          <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ color: '#666' }}>
                Fecha: {presupuestoEditando ? presupuestoEditando.fecha : ''}
              </Text>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={modificarPresupuesto}>
              <Text style={styles.saveText}>Actualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelBtn, { backgroundColor: '#ffecec', marginTop: 8 }]}
              onPress={() => {
                // botón eliminar (confirmación adicional)
                if (presupuestoEditando) confirmarEliminar(presupuestoEditando.id);
              }}
            >
              <Text style={[styles.cancelText, { color: '#a00' }]}>Eliminar</Text>
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  filtrarBtn: {
    backgroundColor: '#0e620dff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
});