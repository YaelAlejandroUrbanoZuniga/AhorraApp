import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOOTER_HEIGHT = 72;

export default function AjustesScreen() {
  const user = {
    name: 'USUARIO',
    email: 'USUARIO@EXAMPLE.COM',
    monthlyIncome: 12000,
  };

  const handleLogout = () => {
    Alert.alert('CERRAR SESIÓN', '¿SEGURO QUE QUIERES SALIR?', [
      { text: 'CANCELAR', style: 'cancel' },
      { text: 'SÍ, SALIR', onPress: () => console.log('SESION CERRADA') },
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
            <Text style={styles.greetingSmall}>USUARIO</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bellButton} activeOpacity={0.8} onPress={() => navigation.navigate("Notificaciones")}>
          <Ionicons name="notifications" size={18} color="#fff" />
        </TouchableOpacity>
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

  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0b4f10',
    alignItems: 'center',
    justifyContent: 'center',
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
    textTransform: 'uppercase',
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

  piePagina: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  itemPiePagina: {
    alignItems: 'center',
  },
  textoPiePagina: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  textoPiePaginaActivo: {
    color: '#0e620dff',
    fontWeight: '800',
  },
});