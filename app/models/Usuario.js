export class Usuario {
    constructor(id, nombre, email, password) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    // Validaciones de reglas de negocio
    static validarRegistro(nombre, email, password) {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error('El nombre es obligatorio.');
        }
        // Validación simple de formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new Error('El correo electrónico no es válido.');
        }
        if (!password || password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }
    }
}