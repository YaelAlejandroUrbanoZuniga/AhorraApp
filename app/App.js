
// Importante: gesture-handler debe ser la primera línea si usas gestos (aunque no es estricto en Expo moderno, es buena práctica)
import React, { useEffect } from 'react';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { initDB } from "./services/PresupuestoService";


import InicioSesionScreen from "./Screens/InicioSesionScreen";
import RegistroScreen from "./Screens/RegistroScreen";

import PrincipalScreen from "./Screens/PrincipalScreen";
import TransaccionesScreen from "./Screens/TransaccionesScreen";
import NuevaTransaccionScreen from "./Screens/NuevaTransaccionScreen";
import AjustesScreen from "./Screens/AjustesScreen";

import PresupuestosScreen from "./Screens/PresupuestosScreen";
import GraficasScreen from "./Screens/GraficasScreen";

import NotificacionesScreen from "./Screens/NotificacionesScreen";

// Creamos los navegadores
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- CONFIGURACIÓN DEL MENÚ DE PESTAÑAS (TABS) ---
// Este componente contiene las pantallas principales de la app una vez logueado
function MenuPrincipalTabs() {
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Ocultamos el encabezado por defecto de los tabs
        tabBarActiveTintColor: "#0e620dff", // Color verde activo
        tabBarInactiveTintColor: "gray",    // Color gris inactivo
        tabBarStyle: { height: 60, paddingBottom: 8 },

        // Lógica para los íconos dinámicos según la ruta
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case "Principal":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Transacciones":
              iconName = focused ? "swap-horizontal" : "swap-horizontal-outline";
              break;
            case "Presupuestos":
              iconName = focused ? "wallet" : "wallet-outline";
              break;
            case "Graficas":
              iconName = focused ? "pie-chart" : "pie-chart-outline";
              break;
            case "Ajustes":
              iconName = focused ? "settings" : "settings-outline";
              break;
            default:
              iconName = "alert-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Principal" component={PrincipalScreen} />
      <Tab.Screen name="Transacciones" component={TransaccionesScreen} />
      <Tab.Screen name="Presupuestos" component={PresupuestosScreen} />
      <Tab.Screen name="Graficas" component={GraficasScreen} />
      <Tab.Screen name="Ajustes" component={AjustesScreen} />
    </Tab.Navigator>
  );
}

// --- CONFIGURACIÓN PRINCIPAL DE LA NAVEGACIÓN (STACK) ---
// Este es el "padre" de toda la navegación. Decide qué mostrar primero.
export default function App() {

  useEffect(() => {
  initDB();
  console.log("Base de datos inicializada");
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" // <-- IMPORTANTE: La app arranca en el Login
        screenOptions={{ headerShown: false }} // Ocultamos el encabezado del stack
      >
        {/* Pantallas de Autenticación */}
        <Stack.Screen name="Login" component={InicioSesionScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />

        {/* Pantalla Principal (que contiene los Tabs) */}
        {/* Cuando el usuario hace login exitoso, navega a 'MenuPrincipal' */}
        <Stack.Screen name="MenuPrincipal" component={MenuPrincipalTabs} />
        
        {/* Pantallas adicionales fuera de los tabs */}
        <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
        <Stack.Screen name="NuevaTransaccion" component={NuevaTransaccionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}