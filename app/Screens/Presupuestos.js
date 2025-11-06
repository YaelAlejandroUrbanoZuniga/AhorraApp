import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
// Adaptamos las importaciones de navegación al estilo de tu proyecto
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 

// Datos iniciales
const initialPresupuestos = [
  { id: '1', monto: '$5000.00', categoria: 'Escuela', fecha: '29 - 02 - 2025', descripcion: 'Inscripción en la UPO bien cara' },
  { id: '2', monto: '$150.00', categoria: 'Comida', fecha: '05 - 03 - 2025', descripcion: 'Súper del mes' },
  { id: '3', monto: '$800.00', categoria: 'Transporte', fecha: '10 - 03 - 2025', descripcion: 'Pago de bus' },
];

// Usamos la sintaxis de función simple, más parecida a tu ejemplo
export default function PresupuestosScreen() {
  const router = useRouter(); 
  const params = useLocalSearchParams(); 

  // Variables de estado
  const [presupuestos, setPresupuestos] = useState(initialPresupuestos);
  const [isEditing, setIsEditing] = useState(false); 

  // Función para manejar la navegación a edición
  const handleEditarPresupuesto = (presupuesto) => {
    if (!isEditing) {
        return; // No hacemos nada si no estamos en modo edición
    }
    
    // Navegamos y enviamos el presupuesto serializado
    router.push({
        pathname: '/editarPresupuesto', 
        params: {
            presupuesto: JSON.stringify(presupuesto)
        }
    });
  };

  // Función para cambiar entre modo normal y modo edición
  const handleToggleEditing = () => {
    setIsEditing(!isEditing); 
  };
  
  // Función para navegar a la creación de nuevo presupuesto
  const handleNavegarNuevoPresupuesto = () => {
    router.push('/nuevoPresupuesto'); 
  };


  // *** LÓGICA DE RECEPCIÓN DE DATOS (CREATE) ***
  useEffect(() => {
    if (params.nuevoPresupuesto) {
      try {
        const nuevo = JSON.parse(params.nuevoPresupuesto);
        const presupuestoFinal = {
            ...nuevo,
            id: Date.now().toString(),
            fecha: new Date().toLocaleDateString('es-MX', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, ' - ')
        };

        // setPresupuestos(prev => [presupuestoFinal, ...prev]) adaptado a sintaxis simple:
        setPresupuestos([presupuestoFinal, ...presupuestos]); 
        router.setParams({ nuevoPresupuesto: undefined });
      } catch (error) {
        console.log("Error al procesar el nuevo presupuesto:", error);
      }
    }
  }, [params.nuevoPresupuesto]); // Se ejecuta al cambiar el parámetro

  // *** LÓGICA DE RECEPCIÓN DE DATOS (UPDATE y DELETE) ***
  useEffect(() => {
    if (params.presupuestoEditado) {
      try {
        const data = JSON.parse(params.presupuestoEditado);
        
        if (data.accion === 'actualizar') {
          // Actualiza la lista
          const listaActualizada = presupuestos.map(p => (p.id === data.id ? data : p));
          setPresupuestos(listaActualizada);
          Alert.alert("Éxito", "Presupuesto actualizado correctamente.");
        } else if (data.accion === 'eliminar') {
          // Elimina de la lista
          const listaFiltrada = presupuestos.filter(p => p.id !== data.id);
          setPresupuestos(listaFiltrada);
          Alert.alert("Éxito", "Presupuesto eliminado correctamente.");
        }
        
        router.setParams({ presupuestoEditado: undefined }); 
        setIsEditing(false); // Sale del modo edición al terminar la acción
      } catch (error) {
        console.log("Error al procesar la edición/eliminación:", error);
      }
    }
  }, [params.presupuestoEditado]); // Depende del parámetro de edición


  return (
    <SafeAreaView style={styles.container}> 
      
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MIS PRESUPUESTOS</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <View style={styles.budgetTable}>
          {/* Encabezado de la Tabla */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Monto</Text>
            <Text style={styles.tableHeaderText}>Categoría</Text>
            <Text style={styles.tableHeaderText}>Fecha</Text>
            <Text style={styles.tableHeaderText}>{isEditing ? 'Acción' : 'Descripción'}</Text>
          </View>
          
          {/* Cuerpo de la Tabla */}
          <ScrollView style={styles.tableBody}>
            {presupuestos.map((presupuesto) => (
              <TouchableOpacity 
                key={presupuesto.id} 
                style={styles.tableRow}
                // Si isEditing es verdadero, se activa la navegación
                onPress={() => isEditing ? handleEditarPresupuesto(presupuesto) : null}
              >
                <Text style={styles.tableCellMonto}>{presupuesto.monto}</Text>
                <Text style={styles.tableCell}>{presupuesto.categoria}</Text>
                <Text style={styles.tableCell}>{presupuesto.fecha}</Text>
                
                {isEditing ? (
                  // MODO EDICIÓN: Muestra el botón de editar
                  <View style={styles.editButtonContainer}>
                      <Text style={styles.editButtonText}>✏️ Editar</Text>
                  </View>
                ) : (
                  // MODO NORMAL: Muestra la Descripción
                  <Text style={styles.tableCell}>{presupuesto.descripcion}</Text>
                )}

              </TouchableOpacity>
            ))}
            {presupuestos.length === 0 && (
                <Text style={styles.noDataText}>No hay presupuestos registrados.</Text>
            )}
          </ScrollView>
        </View>

        {/* CONTENEDOR DE BOTONES INFERIOR */}
        <View style={styles.buttonContainer}>
            {/* Botón NUEVO PRESUPUESTO */}
            <TouchableOpacity 
                style={[styles.actionButton, styles.newButton]} 
                onPress={handleNavegarNuevoPresupuesto}
            >
              <Text style={styles.newButtonText}>NUEVO PRESUPUESTO</Text>
            </TouchableOpacity>

            {/* Botón EDITAR PRESUPUESTOS / CANCELAR EDICIÓN */}
            <TouchableOpacity 
                style={[styles.actionButton, isEditing ? styles.cancelButton : styles.editButton]} 
                onPress={handleToggleEditing}
            >
              <Text style={styles.actionButtonText}>{isEditing ? 'CANCELAR EDICIÓN' : 'EDITAR PRESUPUESTOS'}</Text>
            </TouchableOpacity>
        </View>
      </View>

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Adaptamos la sintaxis de estilos a tu formato
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6FCF97', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    // Simplificamos la lógica de sombra para que sea más fácil de leer
    elevation: 4, 
  },
  iconButton: {
    padding: 5,
  },
  iconText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  budgetTable: {
    width: '100%',
    backgroundColor: '#E6FFE6', 
    borderRadius: 10,
    padding: 10,
    flex: 1, 
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    marginBottom: 5,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 12,
    width: '25%', 
    textAlign: 'center',
    color: '#000',
  },
  tableBody: {
    flexGrow: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    fontSize: 10,
    width: '25%',
    textAlign: 'center',
    color: '#000',
    paddingHorizontal: 2,
  },
  tableCellMonto: {
    fontSize: 10,
    width: '25%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 2,
  },
  
  // Estilos para el modo edición en la tabla
  editButtonContainer: {
    width: '25%',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
    padding: 3,
    borderRadius: 5,
    backgroundColor: '#95C141', 
  },

  // Estilos para los botones inferiores
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButton: {
    paddingVertical: 12, 
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10, 
  },
  actionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Colores de los botones de acción
  newButton: {
    backgroundColor: '#6FCF97', // Nuevo Presupuesto (Verde)
  },
  editButton: {
    backgroundColor: '#ccc', // Editar Presupuestos (Gris)
  },
  cancelButton: {
    backgroundColor: '#EB5757', // Cancelar Edición (Rojo)
  },
  
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: '#fff',
  },
  navText: {
    fontSize: 10,
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  }
});