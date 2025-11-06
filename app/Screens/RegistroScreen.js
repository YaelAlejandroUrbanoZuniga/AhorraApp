import React, { useState } from 'react';
import { View, Text,StyleSheet, TextInput, Pressable, 
        Alert,KeyboardAvoidingView,Platform,ScrollView,
        SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegistroScreen({ onNavigateToLogin }) {

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [ingreso, setIngreso] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegistro = () => {
        if (nombreCompleto.trim() === '' || email.trim() === '' || ingreso.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }
        if (isNaN(Number(ingreso)) || Number(ingreso) <= 0) {
            Alert.alert('Error', 'Por favor ingresa un monto de ingreso válido.');
            return;
        }

        Alert.alert(
            'Registro exitoso', 
            `Nombre: ${nombreCompleto}\nEmail: ${email}`
        );
        
        onNavigateToLogin();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.logoContainer}>
                        <Ionicons name="leaf" size={48} color="white" />
                    </View>

                    <Text style={styles.title}>CREAR CUENTA</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre Completo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre completo"
                            placeholderTextColor="#AAA"
                            value={nombreCompleto}
                            onChangeText={setNombreCompleto}
                            autoCapitalize="words"
                        />
                        <Text style={styles.label}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#AAA"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Text style={styles.label}>Ingreso Mensual</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0.00"
                            placeholderTextColor="#AAA"
                            value={ingreso}
                            onChangeText={setIngreso}
                            keyboardType="numeric"
                        />
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#AAA"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <Text style={styles.label}>Confirmar Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="#AAA"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
						/>
                    </View>

                    <Pressable style={styles.button} onPress={handleRegistro}>
                        <Text style={styles.buttonText}>CREAR CUENTA</Text>
                    </Pressable>

                    <Pressable style={styles.footer} onPress={onNavigateToLogin}>
                        <Text style={styles.linkText}>← Volver a Iniciar Sesión</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#00C853',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#F7F7F7',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#00C853',
        paddingVertical: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 25,
    },
    linkText: {
        fontSize: 14,
        color: '#00C853',
        fontWeight: 'bold',
    },
});