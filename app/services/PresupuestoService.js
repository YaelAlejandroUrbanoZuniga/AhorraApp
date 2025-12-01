// PresupuestoService.js
import * as SQLite from "expo-sqlite";

// Base de datos
let db = null;

// 🔵 Inicializar Base de Datos
export const initDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("presupuestos.db");
  }

  // Crear tabla
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS presupuestos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoria TEXT,
      monto REAL,
      usado REAL,
      fecha TEXT
    );
  `);

  console.log("✅ Base de datos lista");
};

// 🔵 INSERTAR PRESUPUESTO
export const agregarPresupuestoDB = async (categoria, monto, usado, fecha) => {
  if (!db) await initDB();

  const result = await db.runAsync(
    `INSERT INTO presupuestos (categoria, monto, usado, fecha)
     VALUES (?, ?, ?, ?)`,
    [categoria, monto, usado, fecha]
  );

  return result.lastInsertRowId; // ID insertado
};

// 🔵 OBTENER PRESUPUESTOS (con filtros opcionales)
export const obtenerPresupuestosDB = async (filtroCategoria, filtroFecha) => {
  if (!db) await initDB();

  let query = "SELECT * FROM presupuestos WHERE 1=1";
  let params = [];

  if (filtroCategoria && filtroCategoria.trim() !== "") {
    query += " AND categoria LIKE ?";
    params.push(`%${filtroCategoria}%`);
  }

  if (filtroFecha && filtroFecha.trim() !== "") {
    query += " AND fecha = ?";
    params.push(filtroFecha);
  }

  const rows = await db.getAllAsync(query, params);
  return rows;
};

// 🔵 EDITAR PRESUPUESTO
export const editarPresupuestoDB = async (id, categoria, monto, usado, fecha) => {
  if (!db) await initDB();

  return await db.runAsync(
    `UPDATE presupuestos 
       SET categoria=?, monto=?, usado=?, fecha=?
     WHERE id=?`,
    [categoria, monto, usado, fecha, id]
  );
};

// 🔵 ELIMINAR PRESUPUESTO
export const eliminarPresupuestoDB = async (id) => {
  if (!db) await initDB();

  return await db.runAsync(
    `DELETE FROM presupuestos WHERE id = ?`,
    [id]
  );
};
