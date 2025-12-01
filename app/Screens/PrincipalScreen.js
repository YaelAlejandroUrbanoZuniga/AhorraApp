import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FOOTER_HEIGHT = 72;

export default function PrincipalScreen({ navigation }) 
{
  const totalIncome = 8000.0;
  const totalExpenses = 1760.0;
  const balance = totalIncome - totalExpenses;
  const unreadCount = 2;
  const budgets = [
    { id: '1', category: 'ALIMENTACIÓN', spent: 450, limit: 500 },
    { id: '2', category: 'TRANSPORTE', spent: 120, limit: 300 },
    { id: '3', category: 'ENTRETENIMIENTO', spent: 80, limit: 200 },
  ];

  const budgetAlerts = budgets.filter(b => b.spent / b.limit >= 0.8);

  return (
    <SafeAreaView style={styles.areaSegura}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={18} color="#0e620dff" />
          </View>
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingSmall}>AHORRA + APP</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bellButton} activeOpacity={0.8} onPress={() => navigation.navigate("Notificaciones")}>
          <Ionicons name="notifications" size={18} color="#fff" />
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.contenedorPrincipal, { paddingBottom: FOOTER_HEIGHT + 28 }]}>
        <View style={styles.balanceWrap}>
          <View style={styles.balanceCircle}>
            <Text style={styles.balanceLabel}>BALANCE TOTAL</Text>
            <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>NO TIENES NUEVAS NOTIFICACIONES</Text>
        </View>

        <View style={styles.quickActions}>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => navigation.navigate("Presupuestos")}>
            <View style={styles.actionIconWrap}>
              <Ionicons name="wallet" size={20} color="#0e620dff" />
            </View>
            <Text style={styles.actionText}>PRESUPUESTOS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => navigation.navigate("Graficas")}>
            <View style={styles.actionIconWrap}>
              <Ionicons name="pie-chart" size={20} color="#0e620dff" />
            </View>
            <Text style={styles.actionText}>GRÁFICAS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statIncome]}>
            <Text style={styles.statLabel}>INGRESOS</Text>
            <Text style={styles.statValue}>${totalIncome.toFixed(2)}</Text>
          </View>

          <View style={[styles.statCard, styles.statExpense]}>
            <Text style={styles.statLabel}>GASTOS</Text>
            <Text style={styles.statValue}>${totalExpenses.toFixed(2)}</Text>
          </View>
        </View>

        {budgetAlerts.length > 0 && (
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>⚠️ ALERTAS DE PRESUPUESTO</Text>
            {budgetAlerts.map(b => {
              const percent = (b.spent / b.limit) * 100;
              return (
                <View key={b.id} style={styles.alertRow}>
                  <Text style={styles.alertText}>{b.category}</Text>
                  <Text style={styles.alertPercent}>{percent.toFixed(0)}% USADO</Text>
                </View>
              );
            })}
          </View>
        )}
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
    fontSize: 18,
    fontWeight: '600',
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
  unreadBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff3b30',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  contenedorPrincipal: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
  },

  balanceWrap: {
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 18,
  },
  balanceCircle: {
    width: SCREEN_WIDTH * 0.72,
    height: SCREEN_WIDTH * 0.72,
    borderRadius: (SCREEN_WIDTH * 0.72) / 2,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    padding: 14,
  },
  balanceLabel: {
    color: '#eaf7ef',
    fontSize: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },

  banner: {
    backgroundColor: '#f1f5f7',
    borderRadius: 16,
    padding: 14,
    marginVertical: 12,
    alignItems: 'center',
  },
  bannerText: {
    color: '#666',
    fontSize: 13,
    textTransform: 'uppercase',
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  actionCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  actionIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#ecf9ef',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statIncome: {
    backgroundColor: '#E8F7EC',
  },
  statExpense: {
    backgroundColor: '#FFF5F5',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 6,
    color: '#4b4b4b',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },

  alertBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 14,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#FFE8C7',
  },
  alertTitle: {
    color: '#B46309',
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  alertText: {
    color: '#4b4b4b',
    textTransform: 'uppercase',
  },
  alertPercent: {
    color: '#B46309',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});