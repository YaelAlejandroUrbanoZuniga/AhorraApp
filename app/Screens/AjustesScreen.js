import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AjustesScreen() {
  const user = {
    name: 'Usuario',
    email: 'usuario@example.com',
    monthlyIncome: 12000,
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Seguro que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sí, salir', onPress: () => console.log('Sesión cerrada') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={40} color="#fff" />
        <Text style={styles.headerTitle}>AJUSTES</Text>
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={35} color="#2e7d32" />
          </View>
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.incomeContainer}>
          <Text style={styles.incomeLabel}>Ingreso mensual</Text>
          <Text style={styles.incomeValue}>${user.monthlyIncome.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Ayuda</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Idioma</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Modo oscuro</Text>
          <Ionicons name="moon-outline" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerApp}>AHORRA + APP</Text>
        <Text style={styles.footerVersion}>Versión 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1fdf1',
    padding: 20,
  },
  header: {
    backgroundColor: '#2e7d32',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#e8f5e9',
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  incomeContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  incomeLabel: {
    color: '#777',
    fontSize: 13,
  },
  incomeValue: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 25,
  },
  footerApp: {
    color: '#666',
    fontSize: 13,
  },
  footerVersion: {
    color: '#aaa',
    fontSize: 12,
  },
});