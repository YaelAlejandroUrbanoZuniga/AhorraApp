import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router'; 

export default function EditarPresupuestoScreen() {
  const router = useRouter(); 
  const params = useLocalSearchParams(); 

  // Variables de estado del formulario
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Cargar datos al iniciar el componente
  useEffect(() => {
    if (params.presupuesto) {
      try {
        const presupuestoAEditar = JSON.parse(params.presupuesto);
        setId(presupuestoAEditar.id);
        setNombre(presupuestoAEditar.categoria); 
        setMonto(presupuestoAEditar.monto.replace('$', '')); 
        setFecha(presupuestoAEditar.fecha);
        setDescripcion(presupuestoAEditar.descripcion);
      } catch (error) {
        console.log("Error al cargar datos del presupuesto:", error);
      }
    }
  }, [params.presupuesto]);

  // Función GUARDAR CAMBIOS (Actualizar)
  const handleGuardarCambios = () => {
    if (!nombre || !monto) {
      Alert.alert('Error', 'El Nombre y el Monto son obligatorios.');
      return;
    }
    
    const presupuestoActualizado = {
      id: id,
      categoria: nombre,
      monto: `$${parseFloat(monto).toFixed(2)}`,
      fecha: fecha,
      descripcion: descripcion,
      accion: 'actualizar' 
    };
    
    // Enviar a la pantalla de presupuestos y volver
    router.replace({ 
        pathname: '/presupuestos',
        params: { 
            presupuestoEditado: JSON.stringify(presupuestoActualizado)
        } 
    });
  };

  // Función ELIMINAR PRESUPUESTO
  const handleEliminarPresupuesto = () => {
    // Usamos el Alert de RN para la confirmación
    Alert.alert(
        "Confirmar Eliminación",
        "¿Estás seguro de que quieres eliminar este presupuesto?",
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            { 
                text: "Eliminar", 
                onPress: () => {
                    // Enviar solo el ID y la acción 'eliminar'
                    router.replace({ 
                        pathname: '/presupuestos',
                        params: { 
                            presupuestoEditado: JSON.stringify({ id: id, accion: 'eliminar' })
                        } 
                    });
                },
                style: "destructive"
            }
        ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>👤</Text> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDITAR PRESUPUESTOS</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔔</Text> 
        </TouchableOpacity>
      </View>

      {/* Contenido principal con campos de texto */}
      <View style={styles.content}>
        
        {/* Campo Nombre */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* Campo Monto */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={styles.input}
            placeholder="Monto"
            keyboardType="numeric"
            value={monto}
            onChangeText={setMonto}
          />
        </View>

        {/* Campo Fecha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput
            style={styles.input}
            placeholder="Fecha"
            value={fecha}
            onChangeText={setFecha}
          />
        </View>

        {/* Campo Descripción */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            multiline
            numberOfLines={4}
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>

        {/* Botón GUARDAR CAMBIOS */}
        <TouchableOpacity style={styles.saveChangesButton} onPress={handleGuardarCambios}>
          <Text style={styles.saveChangesButtonText}>GUARDAR CAMBIOS</Text>
        </TouchableOpacity>

        {/* Botón ELIMINAR PRESUPUESTO */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleEliminarPresupuesto}>
          <Text style={styles.deleteButtonText}>ELIMINAR PRESUPUESTO</Text>
        </TouchableOpacity>
      </View>

    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#6FCF97', paddingVertical: 15, paddingHorizontal: 20, width: '100%',
    elevation: 4,
  },
  iconButton: { padding: 5 },
  iconText: { fontSize: 24, color: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  inputGroup: { width: '100%', marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold', color: '#000' },
  input: {
    width: '100%', minHeight: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10,
    paddingHorizontal: 15, fontSize: 16, backgroundColor: '#fff',
  },
  textArea: { height: 120, textAlignVertical: 'top', paddingVertical: 10 },
  
  saveChangesButton: {
    backgroundColor: '#6FCF97',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30, 
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10, 
  },
  saveChangesButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  deleteButton: {
    backgroundColor: '#EB5757', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  bottomNavigation: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#000', paddingVertical: 10, width: '100%',
  },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 24, color: '#fff' },
  navText: { fontSize: 10, color: '#fff', marginTop: 5, fontWeight: 'bold' },
});