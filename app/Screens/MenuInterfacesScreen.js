import { Text, StyleSheet, View, Button } from 'react-native';
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

import InicioSesionScreen from './InicioSesionScreen';
import RegistroScreen from './RegistroScreen';
import PrincipalScreen from './PrincipalScreen';
import AjustesScreen from './AjustesScreen';
import TransaccionesScreen from './TransaccionesScreen';
import NuevaTransaccionScreen from './NuevaTransaccionScreen';
import PresupuestosScreen from './PresupuestosScreen';
import NuevoPresupuestoScreen from './NuevoPresupuestoScreen';
import GraficasScreen from './GraficasScreen';
import NotificacionesScreen from './NotificacionesScreen';

export default function MenuInterfacesScreen()
{
    const[screen, setScreen] = useState('Menu');
    switch(screen)
    {
        case 'InicioSesionScreen':
            return <InicioSesionScreen/>
        case 'RegistroScreen':
            return <RegistroScreen/>
        case 'PrincipalScreen':
            return <PrincipalScreen/>
        case 'AjustesScreen':
            return <AjustesScreen/>
        case 'TransaccionesScreen':
            return <TransaccionesScreen/>
        case 'NuevaTransaccionScreen':
            return <NuevaTransaccionScreen/>
        case 'PresupuestosScreen':
            return <PresupuestosScreen/>
        case 'NuevoPresupuestoScreen':
            return <NuevoPresupuestoScreen/>
        case 'GraficasScreen':
            return <GraficasScreen/>
        case 'NotificacionesScreen':
            return <NotificacionesScreen/>
        case 'Menu':
            default:
                return(
                    <View style={styles.Principal}>
                        <Text style={styles.Descripcion}>UNIVERSIDAD POLITÉCNICA DE QUERÉTARO</Text>
                        <Text style={styles.Menu}>MENÚ DE INTERFACES</Text>

                        <View style={styles.BotonesMenu}>
                        <Button color= '#025b7bff' onPress={()=>setScreen('InicioSesionScreen')} title='Interfaz: Inicio Sesión'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('RegistroScreen')} title='Interfaz: Registro Sesión'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('PrincipalScreen')} title='Interfaz: Pantalla Principal'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('AjustesScreen')} title='Interfaz: Ajustes'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('TransaccionesScreen')} title='Interfaz: Transacciones'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('NuevaTransaccionScreen')} title='Interfaz: Nueva Transacción'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('PresupuestosScreen')} title='Interfaz: Presupuestos'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('NuevoPresupuestoScreen')} title='Interfaz: Nuevo Presupuesto'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('GraficasScreen')} title='Interfaz: Graficas'/>
                        <Button color= '#025b7bff' onPress={()=>setScreen('NotificacionesScreen')} title='Interfaz: Notificaciones'/>
                        </View>

                        <Text style={styles.Descripcion}>DESARROLLO DE APLICACIONES</Text>
                        <Text style={styles.Descripcion2}>Guerra Lopez Ivan Isay</Text>
                        <Text style={styles.Descripcion}>TIID - 214</Text>
                        <Text style={styles.Descripcion3}>Alvarez Olguin Karla Sofia</Text>
                        <Text style={styles.Descripcion3}>Campusano León María Monserrat</Text>
                        <Text style={styles.Descripcion3}>Estrada Carranza America Montserrath</Text>
                        <Text style={styles.Descripcion3}>Hernandez Gutierrez Alexis</Text>
                        <Text style={styles.Descripcion3}>Urbano Zuñiga Yael Alejandro</Text>
                    </View>
                )        
    }
}

const styles = StyleSheet.create(
{
    Principal:
    {
        flex: 1,
        backgroundColor: '#cbfcfdff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Menu:
    {
        color:'#025b7bff',
        fontSize: 50,
        fontFamily: 'Times New Roman',
        fontWeight: '888',
        textDecorationLine: 'underline',
        marginBottom: 40
    },

    Descripcion:
    {
        color:'#025b7bff',
        fontSize: 15,
        fontFamily: 'Arial',
        fontWeight: '800',
        marginBottom: 8
    },

    Descripcion2:
    {
        color:'#025b7bff',
        fontSize: 15,
        fontFamily: 'Arial',
        marginBottom: 30
    },
    
    Descripcion3:
    {
        color:'#025b7bff',
        fontSize: 15,
        fontFamily: 'Arial',
        marginBottom: 4
    },

    BotonesMenu:
    {
        marginTop: 5,
        flexDirection: 'column',
        gap: 2,
        marginBottom: 100
    },
});