import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOOTER_HEIGHT = 72;

export default function GraficasScreen() {
  return (
    <SafeAreaView style={styles.areaSegura}>

      {/* HEADER — idéntico al de Presupuestos */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={18} color="#0e620dff" />
          </View>
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingSmall}>GRÁFICAS</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bellButton} activeOpacity={0.8}>
          <Ionicons name="notifications" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* CONTENIDO */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 15, color: '#444' }}>
          Aquí se mostrarán tus gráficas.
        </Text>
      </View>

      {/* FOOTER — idéntico al de Presupuestos, con INICIO activo */}
      <View style={[styles.piePagina, { height: FOOTER_HEIGHT }]}>

        <TouchableOpacity style={styles.itemPiePagina} activeOpacity={0.8}>
          <Ionicons name="list" size={20} color="#999" />
          <Text style={styles.textoPiePagina}>TRANSACCIONES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemPiePagina} activeOpacity={0.8}>
          <Ionicons name="home" size={20} color="#0e620dff" />
          <Text style={[styles.textoPiePagina, styles.textoPiePaginaActivo]}>INICIO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemPiePagina} activeOpacity={0.8}>
          <Ionicons name="settings" size={20} color="#999" />
          <Text style={styles.textoPiePagina}>AJUSTES</Text>
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

  /* HEADER */
  header: {
    backgroundColor: '#0e620dff',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerGreeting: { justifyContent: 'center' },
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

  /* CARD PRESUPUESTO */
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
  amount: { fontWeight: '600', color: '#333' },
  used: { fontWeight: '600', color: '#f39c12' },
  remaining: { fontWeight: '600', color: '#0b6623' },
  percentage: { fontWeight: '700', color: '#777' },

  /* BOTONES */
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: FOOTER_HEIGHT + 12,
    textAlign: 'center',
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
  },

  /* FOOTER */
  piePagina: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  itemPiePagina: { alignItems: 'center' },
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