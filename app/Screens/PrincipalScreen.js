import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PrincipalScreen() {
  const totalIncome = 8000.0;
  const totalExpenses = 1760.0;
  const balance = totalIncome - totalExpenses;
  const unreadCount = 2;
  const budgets = [
    { id: '1', category: 'Alimentación', spent: 450, limit: 500 },
    { id: '2', category: 'Transporte', spent: 120, limit: 300 },
    { id: '3', category: 'Entretenimiento', spent: 80, limit: 200 },
  ];

  const budgetAlerts = budgets.filter(b => b.spent / b.limit >= 0.8);

  return (
    <SafeAreaView style={styles.areaSegura}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <FontAwesome name="user" size={18} color="#0e620dff" />
          </View>
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingSmall}>¡Hola, Usuario!</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bellButton} activeOpacity={0.8}>
          <FontAwesome name="bell" size={18} color="#fff" />
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contenedorPrincipal}>
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
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <View style={styles.actionIconWrap}>
              <FontAwesome name="wallet" size={20} color="#0e620dff" />
            </View>
            <Text style={styles.actionText}>Presupuestos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <View style={styles.actionIconWrap}>
              <FontAwesome name="pie-chart" size={20} color="#0e620dff" />
            </View>
            <Text style={styles.actionText}>Gráficas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statIncome]}>
            <Text style={styles.statLabel}>Ingresos</Text>
            <Text style={styles.statValue}>${totalIncome.toFixed(2)}</Text>
          </View>

          <View style={[styles.statCard, styles.statExpense]}>
            <Text style={styles.statLabel}>Gastos</Text>
            <Text style={styles.statValue}>${totalExpenses.toFixed(2)}</Text>
          </View>
        </View>

        {budgetAlerts.length > 0 && (
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>⚠️ Alertas de Presupuesto</Text>
            {budgetAlerts.map(b => {
              const percent = (b.spent / b.limit) * 100;
              return (
                <View key={b.id} style={styles.alertRow}>
                  <Text style={styles.alertText}>{b.category}</Text>
                  <Text style={styles.alertPercent}>{percent.toFixed(0)}% usado</Text>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.piePagina}>
        <TouchableOpacity style={styles.itemPiePagina} activeOpacity={0.8}>
          <FontAwesome name="list-ul" size={20} color="#999" />
          <Text style={styles.textoPiePagina}>TRANSACCIONES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemPiePagina} activeOpacity={0.8}>
          <FontAwesome name="home" size={20} color="#999" />
          <Text style={styles.textoPiePagina}>INICIO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemPiePagina} activeOpacity={0.8}>
          <FontAwesome name="cog" size={20} color="#0e620dff" />
          <Text style={[styles.textoPiePagina, styles.textoPiePaginaActivo]}>AJUSTES</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerGreeting: {
    justifyContent: 'center',
  },
  greetingSmall: {
    color: '#fff',
    fontSize: 14,
  },

  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0b4f10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ff3b30',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  contenedorPrincipal: {
    padding: 16,
    paddingBottom: 12,
  },

  balanceWrap: {
    alignItems: 'center',
    marginTop: -28, // eleva el círculo por encima del header
    marginBottom: 12,
  },
  balanceCircle: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    borderRadius: (SCREEN_WIDTH * 0.7) / 2,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    padding: 12,
  },
  balanceLabel: {
    color: '#eaf7ef',
    fontSize: 12,
    marginBottom: 6,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },

  banner: {
    backgroundColor: '#f1f5f7',
    borderRadius: 16,
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  bannerText: {
    color: '#666',
    fontSize: 13,
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
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ecf9ef',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#333',
    fontSize: 14,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statIncome: {
    backgroundColor: '#E8F7EC',
    borderColor: '#DFF2DE',
  },
  statExpense: {
    backgroundColor: '#FFF5F5',
    borderColor: '#F6DEDE',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 6,
    color: '#4b4b4b',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },

  alertBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FFE8C7',
  },
  alertTitle: {
    color: '#B46309',
    fontWeight: '700',
    marginBottom: 8,
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  alertText: {
    color: '#4b4b4b',
  },
  alertPercent: {
    color: '#B46309',
    fontWeight: '700',
  },

  piePagina: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingBottom: 20,
  },
  itemPiePagina: {
    alignItems: 'center',
    padding: 5,
  },
  textoPiePagina: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  textoPiePaginaActivo: {
    color: '#0e620dff',
    fontWeight: 'bold',
  },
});
