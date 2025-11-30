import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

class DatabaseService {
    constructor() {
        this.db = null;
    }

    async initialize() {
        if (Platform.OS === 'web') {
            console.log('Web: Usando LocalStorage simulado');
            return;
        }

        try {
            this.db = await SQLite.openDatabaseAsync('ahorraapp.db');
            
            // Crear tabla de usuarios si no existe
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                );
            `);
            console.log('Base de datos inicializada correctamente');
        } catch (error) {
            console.error('Error al inicializar la BD:', error);
        }
    }

    // --- REGISTRO (INSERT) ---
    async registrarUsuario(nombre, email, password) {
        if (Platform.OS === 'web') {
            // Simulación para web
            const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
            if (users.find(u => u.email === email)) throw new Error('El correo ya existe');
            const newUser = { id: Date.now(), nombre, email, password };
            users.push(newUser);
            localStorage.setItem('usuarios', JSON.stringify(users));
            return newUser;
        }

        try {
            const result = await this.db.runAsync(
                'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
                nombre, email, password
            );
            return { id: result.lastInsertRowId, nombre, email };
        } catch (error) {
            if (error.message.includes('UNIQUE')) {
                throw new Error('Este correo ya está registrado.');
            }
            throw error;
        }
    }

    // --- LOGIN (SELECT) ---
    async loginUsuario(email, password) {
        if (Platform.OS === 'web') {
            const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
            return users.find(u => u.email === email && u.password === password);
        }

        const usuario = await this.db.getFirstAsync(
            'SELECT * FROM usuarios WHERE email = ? AND password = ?',
            email, password
        );
        return usuario;
    }

    // --- BUSCAR POR EMAIL (Para Recuperación) ---
    async buscarPorEmail(email) {
        if (Platform.OS === 'web') {
            const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
            return users.find(u => u.email === email);
        }

        const usuario = await this.db.getFirstAsync(
            'SELECT * FROM usuarios WHERE email = ?',
            email
        );
        return usuario;
    }
}

export default new DatabaseService();