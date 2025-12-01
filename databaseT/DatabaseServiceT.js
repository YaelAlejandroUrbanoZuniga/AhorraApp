import * as SQLite from 'expo-sqlite';

class DatabaseServiceT {
  constructor() {
    this.db = null;
    this.storageKey = 'transacciones';
  }

  async initialize() {
    if (Platform.OS === 'web') {
      console.log('Usando LocalStorage para web');
    } else {
      this.db = SQLite.openDatabase('miapp.db'); // ✅ versión estable
      this.db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS transacciones (
            id TEXT PRIMARY KEY NOT NULL,
            fecha TEXT,
            categoria TEXT,
            descripcion TEXT,
            monto REAL,
            tipo TEXT
          );`
        );
      });
    }
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM transacciones ORDER BY fecha DESC',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
  }

  async add(transaccion) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO transacciones (id, fecha, categoria, descripcion, monto, tipo) VALUES (?, ?, ?, ?, ?, ?)',
          [
            transaccion.id,
            transaccion.fecha,
            transaccion.categoria,
            transaccion.descripcion,
            transaccion.monto,
            transaccion.tipo,
          ],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }

  async update(transaccion) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'UPDATE transacciones SET fecha=?, categoria=?, descripcion=?, monto=?, tipo=? WHERE id=?',
          [
            transaccion.fecha,
            transaccion.categoria,
            transaccion.descripcion,
            transaccion.monto,
            transaccion.tipo,
            transaccion.id,
          ],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }

  async remove(id) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM transacciones WHERE id=?',
          [id],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }
}

export default new DatabaseServiceT();