import SQLite from "expo-sqlite";

let db;

// Inicializar BD
export const initDB = async () => {
  db = await SQLite.openDatabaseAsync("presupuestos.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS presupuestos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoria TEXT,
      monto REAL,
      usado REAL,
      fecha TEXT
    );
  `);

  console.log("BD lista");
};

// INSERTAR
export const agregarPresupuestoDB = async (categoria, monto, usado, fecha) => {
  const result = await db.runAsync(
    `INSERT INTO presupuestos (categoria, monto, usado, fecha)
     VALUES (?, ?, ?, ?)`,
    [categoria, monto, usado, fecha]
  );

  return result.lastInsertRowId;
};

// OBTENER
export const obtenerPresupuestosDB = async (filtroCategoria, filtroFecha) => {
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

  return await db.getAllAsync(query, params);
};

// EDITAR
export const editarPresupuestoDB = async (id, categoria, monto, usado, fecha) => {
  return await db.runAsync(
    `UPDATE presupuestos 
     SET categoria = ?, monto = ?, usado = ?, fecha = ?
     WHERE id = ?`,
    [categoria, monto, usado, fecha, id]
  );
};

// ELIMINAR
export const eliminarPresupuestoDB = async (id) => {
  return await db.runAsync(
    "DELETE FROM presupuestos WHERE id = ?",
    [id]
  );
};