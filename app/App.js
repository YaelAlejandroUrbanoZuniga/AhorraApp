import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioSesionScreen from "./Screens/InicioSesionScreen";
import RegistroScreen from "./Screens/RegistroScreen";
import PrincipalScreen from "./Screens/PrincipalScreen";
import PresupuestosScreen from "./Screens/PresupuestosScreen";
import GraficasScreen from "./Screens/GraficasScreen";

const Stack = createNativeStackNavigator();

export default function App() 
{
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,}}>
        <Stack.Screen name="Login" component={InicioSesionScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Principal" component={PrincipalScreen} />
        <Stack.Screen name="Presupuestos" component={PresupuestosScreen} />
        <Stack.Screen name="Graficas" component={GraficasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}