
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MenuPrincipalTabs() {
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => (
        {
          headerShown: false,
          tabBarActiveTintColor: "#0e620dff",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { height: 60, paddingBottom: 8 },

          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Principal":
                iconName = "home";
                break;
              case "Transacciones":
                iconName = "swap-horizontal";
                break;
              case "Presupuestos":
                iconName = "wallet";
                break;
              case "Graficas":
                iconName = "pie-chart";
                break;
              case "Ajustes":
                iconName = "settings";
                break;
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

export default function App() {

  useEffect(() => {
  initDB();
  console.log("Base de datos inicializada");
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={InicioSesionScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="MenuPrincipal" component={MenuPrincipalTabs} />
        <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
        <Stack.Screen name="NuevaTransaccion" component={NuevaTransaccionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}