import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('presupuestos.db');


// Crear tabla si no existe
export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS presupuestos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria TEXT,
        monto REAL,
        usado REAL,
        fecha TEXT
      );`
    );
  });
};

// INSERTAR
export const agregarPresupuestoDB = (categoria, monto, usado, fecha, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO presupuestos (categoria, monto, usado, fecha)
       VALUES (?, ?, ?, ?)`,
      [categoria, monto, usado, fecha],
      (_, result) => callback(result.insertId),
      (_, error) => console.log("Error al insertar:", error)
    );
  });
};

// OBTENER PRESUPUESTOS (con filtros)
export const obtenerPresupuestosDB = (filtroCategoria, filtroFecha, callback) => {
  let query = "SELECT * FROM presupuestos WHERE 1=1";
  let params = [];

  if (filtroCategoria) {
    query += " AND categoria = ?";
    params.push(filtroCategoria);
  }

  if (filtroFecha) {
    query += " AND fecha = ?";
    params.push(filtroFecha);
  }

  db.transaction(tx => {
    tx.executeSql(
      query,
      params,
      (_, { rows }) => callback(rows._array),
      (_, error) => console.log("Error al consultar:", error)
    );
  });
};

// ACTUALIZAR
export const editarPresupuestoDB = (id, categoria, monto, usado, fecha, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE presupuestos 
       SET categoria = ?, monto = ?, usado = ?, fecha = ?
       WHERE id = ?`,
      [categoria, monto, usado, fecha, id],
      (_, result) => callback(result),
      (_, error) => console.log("Error al editar:", error)
    );
  });
};

// ELIMINAR
export const eliminarPresupuestoDB = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "DELETE FROM presupuestos WHERE id = ?",
      [id],
      (_, result) => callback(result),
      (_, error) => console.log("Error al eliminar:", error)
    );
  });
};
