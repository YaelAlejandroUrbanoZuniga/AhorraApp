import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native'; 

const screenWidth = Dimensions.get('window').width;

export default function PrincipalScreen() {
  const ingresos = 8000;
  const egresos = 1760;

  const data = [
    {
      name: 'Ingresos',
      amount: ingresos,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Egresos',
      amount: egresos,
      color: '#2E7D32',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>¡Hola, Usuario!</Text>
      <Text style={styles.saldo}>$8,000.00 Saldo Actual</Text>
      <Text style={styles.notificacion}>NO TIENES NUEVAS NOTIFICACIONES</Text>

      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: () => `#000`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>PRESUPUESTOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>PAGOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>MOVIMIENTOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navGroup}>
        <Button title="INICIO" color="#ff0080" onPress={() => {}} />
        <Button title="AJUSTES" color="#ff0080" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4f0',
    padding: 20,
    alignItems: 'center',
  },
  saludo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  saldo: {
    fontSize: 22,
    color: '#4CAF50',
    marginVertical: 10,
  },
  notificacion: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    width: '100%',
  },
  button: {
    backgroundColor: '#ff9cbd',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '80%',
  },
});
