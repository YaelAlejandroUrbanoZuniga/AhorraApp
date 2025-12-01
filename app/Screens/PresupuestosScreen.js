import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, Alert, StyleSheet, } from "react-native";

import { initDB, agregarPresupuestoDB, obtenerPresupuestosDB, editarPresupuestoDB, eliminarPresupuestoDB,} from "../services/PresupuestoService";

const PresupuestosScreen = () => {
  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
  const [usado, setUsado] = useState("");
  const [fecha, setFecha] = useState("");

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const [presupuestos, setPresupuestos] = useState([]);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalModificar, setModalModificar] = useState(false);

  const [editandoId, setEditandoId] = useState(null);

  // CAMBIO: agregado initDB
  useEffect(() => {
    const preparar = async () => {
      try {
        await initDB();
        await cargarPresupuestos();
      } catch (error) {
        console.log("Error inicializando BD", error);
      }
    };
    preparar();
  }, []);

  const cargarPresupuestos = async () => {
    try {
      const data = await obtenerPresupuestosDB(filtroCategoria, filtroFecha);
      setPresupuestos(data);
    } catch (error) {
      console.log("Error cargarPresupuestos:", error);
    }
  };

  const agregarPresupuesto = async () => {
    if (!categoria || !monto || !usado || !fecha) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      await agregarPresupuestoDB(categoria, parseFloat(monto), parseFloat(usado), fecha);
      setModalAgregar(false);
      setCategoria("");
      setMonto("");
      setUsado("");
      setFecha("");
      cargarPresupuestos();
    } catch (err) {
      console.log("Error agregarPresupuesto:", err);
    }
  };

  const prepararEdicion = (item) => {
    setEditandoId(item.id);
    setCategoria(item.categoria);
    setMonto(item.monto.toString());
    setUsado(item.usado.toString());
    setFecha(item.fecha);
    setModalModificar(true);
  };

  const modificarPresupuesto = async () => {
    if (!categoria || !monto || !usado || !fecha) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      await editarPresupuestoDB(editandoId, categoria, parseFloat(monto), parseFloat(usado), fecha);
      setModalModificar(false);
      setCategoria("");
      setMonto("");
      setUsado("");
      setFecha("");
      cargarPresupuestos();
    } catch (err) {
      console.log("Error modificarPresupuesto:", err);
    }
  };

  const eliminar = async (id) => {
    Alert.alert(
      "Confirmar",
      "¿Deseas eliminar este presupuesto?",
      [
        { text: "Cancelar" },
        {
          text: "Eliminar",
          onPress: async () => {
            await eliminarPresupuestoDB(id);
            cargarPresupuestos();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* FILTROS */}
      <View style={styles.filtrosContainer}>
        <TextInput
          style={styles.inputFiltro}
          placeholder="Filtrar por categoría"
          value={filtroCategoria}
          onChangeText={setFiltroCategoria}
        />
        <TextInput
          style={styles.inputFiltro}
          placeholder="Filtrar por fecha"
          value={filtroFecha}
          onChangeText={setFiltroFecha}
        />

        <TouchableOpacity style={styles.btnBuscar} onPress={cargarPresupuestos}>
          <Text style={styles.btnBuscarText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* LISTADO */}
      <FlatList
        data={presupuestos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay presupuestos</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.categoria}</Text>
            <Text style={styles.cardText}>Monto: ${item.monto}</Text>
            <Text style={styles.cardText}>Usado: ${item.usado}</Text>
            <Text style={styles.cardText}>Fecha: {item.fecha}</Text>

            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.btnEditar}
                onPress={() => prepararEdicion(item)}
              >
                <Text style={styles.btnEditarText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnEliminar}
                onPress={() => eliminar(item.id)}
              >
                <Text style={styles.btnEliminarText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* BOTÓN AGREGAR */}
      <TouchableOpacity
        style={styles.btnAgregar}
        onPress={() => setModalAgregar(true)}
      >
        <Text style={styles.btnAgregarText}>Nuevo presupuesto</Text>
      </TouchableOpacity>

      {/* MODAL AGREGAR */}
      <Modal visible={modalAgregar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}> {/* CAMBIO */}
          
            <TextInput style={styles.input} placeholder="Categoría" placeholderTextColor="#777"  value={categoria} onChangeText={setCategoria} />
            <TextInput style={styles.input} placeholder="Monto" placeholderTextColor="#777" value={monto} onChangeText={setMonto} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Usado" placeholderTextColor="#777" value={usado} onChangeText={setUsado} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Fecha" placeholderTextColor="#777" value={fecha} onChangeText={setFecha} />

            <TouchableOpacity style={styles.saveBtn} onPress={agregarPresupuesto}>
              <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalAgregar(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </Modal>

      {/* MODAL MODIFICAR */}
      <Modal visible={modalModificar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}> {/* CAMBIO */}

            <TextInput style={styles.input} placeholder="Categoría" value={categoria} onChangeText={setCategoria} />
            <TextInput style={styles.input} placeholder="Monto" value={monto} onChangeText={setMonto} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Usado" value={usado} onChangeText={setUsado} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Fecha" value={fecha} onChangeText={setFecha} />

            <TouchableOpacity style={styles.saveBtn} onPress={modificarPresupuesto}>
              <Text style={styles.saveText}>Guardar Cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalModificar(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
};

// TUS ESTILOS QUEDAN IGUAL (NO LOS MUEVO)
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20 
},
  filtrosContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 40,
},
  inputFiltro: { 
    flex: 1, 
    borderWidth: 1,
    padding: 8, 
    marginRight: 8, 
    borderRadius: 8 
},
  btnBuscar: { 
    backgroundColor: "green",
     padding: 10, 
     borderRadius: 8
},
  btnBuscarText: { 
    color: "#fff"
},
  emptyText: { 
    textAlign: "center",
     marginTop: 20 
},
  card: { 
    backgroundColor: "#f6f6f6", 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 12 
},
  cardTitle: { 
    fontSize: 16, 
    fontWeight: "bold" 
},
  cardText: { 
    fontSize: 14,
    marginTop: 4 
},
  cardButtons: { 
    flexDirection: "row", 
    marginTop: 10, 
    justifyContent: "space-between" 
},
  btnEditar: { 
    backgroundColor: "#2196F3", 
    padding: 8, 
    borderRadius: 8 
},
  btnEditarText: { 
    color: "#fff"
},
  btnEliminar: { 
    backgroundColor: "#E53935", 
    padding: 8, 
    borderRadius: 8 
},
  btnEliminarText: { 
    color: "#fff" 
},
  btnAgregar: { 
    ackgroundColor: "green", 
    padding: 14, 
    marginTop: 10, 
    borderRadius: 12 
},
  btnAgregarText: { 
    color: "#fff", 
    textAlign: "center", 
    fontSize: 16 
},
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderColor: "#ccc",
    color: "#000",
  },
  saveBtn: { 
    backgroundColor: "green", 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 10 
},
  saveText: {
     color: "#fff", 
     textAlign: "center" 
},
  cancelBtn: { 
    backgroundColor: "#E53935",
     padding: 14,
      borderRadius: 12 
},
  cancelText: { 
    color: "#fff", 
    textAlign: "center" 
},
btnAgregar: {
  backgroundColor: "#0e620d",
  width: '90%',
  alignSelf: 'center',
  paddingVertical: 15,
  borderRadius: 25,
  marginTop: 20,
  marginBottom: 30,
},
btnAgregarText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
  textAlign: "center",
},

});

export default PresupuestosScreen;