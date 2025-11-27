import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 

const initialPresupuestos = [
  { id: '1', monto: '$5000.00', categoria: 'Escuela', fecha: '29 - 02 - 2025', descripcion: 'Inscripción en la UPO bien cara' },
  { id: '2', monto: '$150.00', categoria: 'Comida', fecha: '05 - 03 - 2025', descripcion: 'Súper del mes' },
  { id: '3', monto: '$800.00', categoria: 'Transporte', fecha: '10 - 03 - 2025', descripcion: 'Pago de bus' },
];

export default function PresupuestosScreen() {
  const router = useRouter(); 
  const params = useLocalSearchParams(); 

  const [presupuestos, setPresupuestos] = useState(initialPresupuestos);
  const [isEditing, setIsEditing] = useState(false); 

  const handleEditarPresupuesto = (presupuesto) => {
    if (!isEditing) {
        return; 
    }
    
    router.push({
        pathname: '/editarPresupuesto', 
        params: {
            presupuesto: JSON.stringify(presupuesto)
        }
    });
  };

  const handleToggleEditing = () => {
    setIsEditing(!isEditing); 
  };
  
  const handleNavegarNuevoPresupuesto = () => {
    router.push('/nuevoPresupuesto'); 
  };


  useEffect(() => {
    if (params.nuevoPresupuesto) {
      try {
        const nuevo = JSON.parse(params.nuevoPresupuesto);
        const presupuestoFinal = {
            ...nuevo,
            id: Date.now().toString(),
            fecha: new Date().toLocaleDateString('es-MX', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, ' - ')
        };

        setPresupuestos([presupuestoFinal, ...presupuestos]); 
        router.setParams({ nuevoPresupuesto: undefined });
      } catch (error) {
        console.log("Error al procesar el nuevo presupuesto:", error);
      }
    }
  }, [params.nuevoPresupuesto]); 

  useEffect(() => {
    if (params.presupuestoEditado) {
      try {
        const data = JSON.parse(params.presupuestoEditado);
        
        if (data.accion === 'actualizar') {
          const listaActualizada = presupuestos.map(p => (p.id === data.id ? data : p));
          setPresupuestos(listaActualizada);
          Alert.alert("Éxito", "Presupuesto actualizado correctamente.");
        } else if (data.accion === 'eliminar') {
          const listaFiltrada = presupuestos.filter(p => p.id !== data.id);
          setPresupuestos(listaFiltrada);
          Alert.alert("Éxito", "Presupuesto eliminado correctamente.");
        }
        
        router.setParams({ presupuestoEditado: undefined }); 
        setIsEditing(false); 
      } catch (error) {
        console.log("Error al procesar la edición/eliminación:", error);
      }
    }
  }, [params.presupuestoEditado]); 


  return (
    <SafeAreaView style={styles.container}> 
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MIS PRESUPUESTOS</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.budgetTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Monto</Text>
            <Text style={styles.tableHeaderText}>Categoría</Text>
            <Text style={styles.tableHeaderText}>Fecha</Text>
            <Text style={styles.tableHeaderText}>{isEditing ? 'Acción' : 'Descripción'}</Text>
          </View>
          
          <ScrollView style={styles.tableBody}>
            {presupuestos.map((presupuesto) => (
              <TouchableOpacity 
                key={presupuesto.id} 
                style={styles.tableRow}
                onPress={() => isEditing ? handleEditarPresupuesto(presupuesto) : null}
              >
                <Text style={styles.tableCellMonto}>{presupuesto.monto}</Text>
                <Text style={styles.tableCell}>{presupuesto.categoria}</Text>
                <Text style={styles.tableCell}>{presupuesto.fecha}</Text>
                
                {isEditing ? (
                  <View style={styles.editButtonContainer}>
                      <Text style={styles.editButtonText}>✏️ Editar</Text>
                  </View>
                ) : (
                  <Text style={styles.tableCell}>{presupuesto.descripcion}</Text>
                )}

              </TouchableOpacity>
            ))}
            {presupuestos.length === 0 && (
                <Text style={styles.noDataText}>No hay presupuestos registrados.</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={[styles.actionButton, styles.newButton]} 
                onPress={handleNavegarNuevoPresupuesto}
            >
              <Text style={styles.newButtonText}>NUEVO PRESUPUESTO</Text>
            </TouchableOpacity>

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
  newButton: {
    backgroundColor: '#6FCF97', 
  },
  editButton: {
    backgroundColor: '#ccc', 
  },
  cancelButton: {
    backgroundColor: '#EB5757',
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