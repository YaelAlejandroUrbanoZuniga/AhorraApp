import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const FOOTER_HEIGHT = 72;

export default function AjustesScreen({ navigation }) {
  const [user, setUser] = useState({
    name: 'Cargando...',
    email: '...',
    monthlyIncome: 0, 
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const userData = JSON.parse(userSession);
          setUser({
            name: userData.nombre, 
            email: userData.email, 
            monthlyIncome: 12000,
          });
        }
      } catch (error) {
        console.error("Error cargando datos del usuario", error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert('CERRAR SESIÓN', '¿Seguro que quieres salir?', [
      { text: 'CANCELAR', style: 'cancel' },
      { 
        text: 'SÍ, SALIR', 
        style: 'destructive', // En iOS se ve rojo
        onPress: async () => {
          try {
            // 1. Borramos la sesión del almacenamiento
            await AsyncStorage.removeItem('userSession');
            
            // 2. Navegamos al Login y reiniciamos el historial para que no pueda volver atrás
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error("Error al cerrar sesión", error);
          }
        } 
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={18} color="#0e620dff" />
          </View>
          <View style={styles.headerGreeting}>
            {/* Mostramos el nombre real del usuario */}
            <Text style={styles.greetingSmall}>{user.name}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.contenedorPrincipal, { paddingBottom: FOOTER_HEIGHT + 28 }]}>
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={35} color="#0e620dff" />
            </View>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.incomeContainer}>
            <Text style={styles.incomeLabel}>INGRESO MENSUAL</Text>
            <Text style={styles.incomeValue}>${user.monthlyIncome.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} activeOpacity={0.8}>
            <Text style={styles.optionText}>AYUDA</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} activeOpacity={0.8}>
            <Text style={styles.optionText}>IDIOMA</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} activeOpacity={0.8}>
            <Text style={styles.optionText}>MODO OSCURO</Text>
            <Ionicons name="moon-outline" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.9}>
          <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
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
  headerGreeting: {
    justifyContent: 'center',
  },
  greetingSmall: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  contenedorPrincipal: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#ecf9ef',
    borderRadius: 50,
    padding: 10,
    marginRight: 14,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0e620dff',
    textTransform: 'uppercase',
  },
  userEmail: {
    fontSize: 13,
    color: '#777',
    // textTransform: 'uppercase', // Email se ve mejor en minúsculas generalmente
  },

  incomeContainer: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  incomeLabel: {
    color: '#777',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  incomeValue: {
    color: '#0e620dff',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
    marginTop: 6,
  },

  optionsContainer: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
    textTransform: 'uppercase',
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#ff5252',
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    textTransform: 'uppercase',
  },
});