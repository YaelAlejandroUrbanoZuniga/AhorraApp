import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
    this.storageKey = 'transacciones';
  }

  async initialize() {
    if (Platform.OS === 'web') {
      console.log('Usando LocalStorage para web');
    } else {
      this.db = await SQLite.openDatabaseAsync('miapp.db'); // ✅ versión async
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS transacciones (
          id TEXT PRIMARY KEY NOT NULL,
          fecha TEXT,
          categoria TEXT,
          descripcion TEXT,
          monto REAL,
          tipo TEXT
        );
      `);
    }
  }

  async getAll() {
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } else {
      return await this.db.getAllAsync('SELECT * FROM transacciones ORDER BY fecha DESC');
    }
  }

  async add(transaccion) {
    if (Platform.OS === 'web') {
      const transacciones = await this.getAll();
      transacciones.push(transaccion);
      localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
    } else {
      await this.db.runAsync(
        'INSERT INTO transacciones (id, fecha, categoria, descripcion, monto, tipo) VALUES (?, ?, ?, ?, ?, ?)',
        [
          transaccion.id,
          transaccion.fecha,
          transaccion.categoria,
          transaccion.descripcion,
          transaccion.monto,
          transaccion.tipo,
        ]
      );
    }
  }

  async update(transaccion) {
    if (Platform.OS === 'web') {
      const transacciones = await this.getAll();
      const actualizadas = transacciones.map(t =>
        t.id === transaccion.id ? transaccion : t
      );
      localStorage.setItem(this.storageKey, JSON.stringify(actualizadas));
    } else {
      await this.db.runAsync(
        'UPDATE transacciones SET fecha=?, categoria=?, descripcion=?, monto=?, tipo=? WHERE id=?',
        [
          transaccion.fecha,
          transaccion.categoria,
          transaccion.descripcion,
          transaccion.monto,
          transaccion.tipo,
          transaccion.id,
        ]
      );
    }
  }

  async remove(id) {
    if (Platform.OS === 'web') {
      const transacciones = await this.getAll();
      const filtradas = transacciones.filter(t => t.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filtradas));
    } else {
      await this.db.runAsync('DELETE FROM transacciones WHERE id=?', [id]);
    }
  }
}

export default new DatabaseService();