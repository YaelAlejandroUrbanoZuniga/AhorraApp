import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegistro = async () => {
        setLoading(true);
        try {
            await controller.registrar(nombre, email, password);
            Alert.alert('Éxito', 'Usuario creado.', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
                
                <Pressable style={styles.button} onPress={handleRegistro} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'REGISTRAR'}</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Login")}>
                     <Text style={{ marginTop: 20, color: '#007BFF' }}>Volver al Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
    button: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});