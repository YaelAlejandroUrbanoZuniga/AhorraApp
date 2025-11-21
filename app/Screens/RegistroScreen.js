import React, { useState } from 'react';
import { View, Text,StyleSheet, TextInput, Pressable, Alert, KeyboardAvoidingView , Platform, ScrollView, SafeAreaView, Image} from 'react-native';

export default function RegistroScreen({ navigation }) 
{
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegistro = () => {
        if (
            nombreCompleto.trim() === '' ||
            email.trim() === '' ||
            edad.trim() === '' ||
            password.trim() === '' ||
            confirmPassword.trim() === ''
        ) {
            Alert.alert('ERROR', 'POR FAVOR COMPLETA TODOS LOS CAMPOS.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('ERROR', 'LAS CONTRASEÑAS NO COINCIDEN.');
            return;
        }
        if (isNaN(Number(edad)) || Number(edad) <= 0) {
            Alert.alert('ERROR', 'POR FAVOR INGRESA UNA EDAD VÁLIDA.');
            return;
        }

        Alert.alert(
            'REGISTRO EXITOSO', 
            `NOMBRE: ${nombreCompleto}\nEMAIL: ${email}`
        );
        navigation.navigate("Login");
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
                        <Image 
                            source={require('../assets/ahorramasapp.png')} 
                            style={styles.logoImage}
                        />
                    </View>

                    <Text style={styles.title}>CREAR CUENTA</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>NOMBRE COMPLETO</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="NOMBRE COMPLETO"
                            placeholderTextColor="#AAA"
                            value={nombreCompleto}
                            onChangeText={setNombreCompleto}
                            autoCapitalize="words"
                        />

                        <Text style={styles.label}>CORREO</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="CORREO ELECTRÓNICO"
                            placeholderTextColor="#AAA"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>EDAD</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="EDAD"
                            placeholderTextColor="#AAA"
                            value={edad}
                            onChangeText={setEdad}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>CONTRASEÑA</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="CONTRASEÑA"
                            placeholderTextColor="#AAA"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />

                        <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="CONFIRMAR CONTRASEÑA"
                            placeholderTextColor="#AAA"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Pressable style={styles.button} onPress={handleRegistro}>
                        <Text style={styles.buttonText}>CREAR CUENTA</Text>
                    </Pressable>

                    <Pressable style={styles.footer} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.linkText}>← VOLVER A INICIAR SESIÓN</Text>
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
        marginBottom: 15,
        alignItems: 'center',
    },
    logoImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
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
        backgroundColor: '#0e620dff',
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
        color: '#0e620dff',
        fontWeight: 'bold',
    },
});
