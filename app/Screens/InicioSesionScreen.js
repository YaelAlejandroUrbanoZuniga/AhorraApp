import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert, SafeAreaView, Image } from 'react-native';
import OlvidarContraseña from './ForgotPasswordModal';

const logoImage = require('../assets/ahorramasapp.png'); 

export default function InicioSesionScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isModalVisible, setModalVisible] = useState(false);

    const handleLogin = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.trim() === '') {
            Alert.alert('Error', 'Por favor ingresa tu correo.');
            return;
        } else if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Por favor ingresa un correo válido.');
            return;
        } else if (password.trim() === '') {
            Alert.alert('Error', 'Por favor ingresa tu contraseña.');
            return;
        } else {
            navigation.navigate("MenuPrincipal");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.logoContainer}>
                    <Image source={logoImage} style={styles.logoImage} />
                </View>

                <Text style={styles.title}>AHORRA + APP</Text>

                <View style={styles.card}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CORREO</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu correo"
                            placeholderTextColor="#AAA"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>CONTRASEÑA</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu contraseña"
                            placeholderTextColor="#AAA"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Pressable onPress={() => setModalVisible(true)} style={{alignSelf: 'flex-end', marginBottom: 15}}>
                        <Text style={{ color: '#0e620dff', fontSize: 14, fontWeight: '600' }}>
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>ACCEDER</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>¿NO TIENES CUENTA? </Text>

                    <Pressable onPress={() => navigation.navigate("Registro")}>
                        <Text style={styles.linkText}> REGÍSTRATE</Text>
                    </Pressable>
                </View>

                <OlvidarContraseña 
                    visible={isModalVisible} 
                    onClose={() => setModalVisible(false)} 
                />

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    logoImage: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0e620dff',
        marginBottom: 25,
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        marginBottom: 25,
    },
    inputContainer: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#fafafa',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 14,
        marginBottom: 18,
        fontSize: 15,
        color: '#333',
    },
    button: {
        backgroundColor: '#0e620dff',
        paddingVertical: 14,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    footerText: {
        fontSize: 14,
        color: '#777',
    },
    linkText: {
        fontSize: 14,
        color: '#0e620dff',
        fontWeight: 'bold',
    },
});