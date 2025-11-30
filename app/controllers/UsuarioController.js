import { Usuario } from '../models/Usuario';
import DatabaseService from '../database/DatabaseService';

export class UsuarioController {
    constructor() {
        this.initialize();
    }

    async initialize() {
        await DatabaseService.initialize();
    }

    // Lógica para Registrar
    async registrar(nombre, email, password) {
        // 1. Validar datos con el Modelo
        Usuario.validarRegistro(nombre, email, password);
        
        // 2. Guardar en BD usando el Servicio
        return await DatabaseService.registrarUsuario(nombre, email.trim(), password);
    }

    // Lógica para Login
    async login(email, password) {
        if (!email || !password) throw new Error('Por favor ingresa correo y contraseña.');
        
        const usuario = await DatabaseService.loginUsuario(email.trim(), password);
        
        if (!usuario) {
            throw new Error('Credenciales incorrectas o usuario no registrado.');
        }
        return usuario;
    }

    // Lógica para Recuperación de Contraseña
    async verificarEmailParaRecuperacion(email) {
        if (!email) throw new Error('Por favor ingresa tu correo.');
        
        const usuario = await DatabaseService.buscarPorEmail(email.trim());
        return usuario; // Retorna el usuario si existe, o null/undefined si no
    }
}