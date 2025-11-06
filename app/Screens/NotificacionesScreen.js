import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

const TarjetaNotificacion = ({ iconoNombre, titulo, mensaje, fecha, colorBorde, isAlert }) => (
    <View style={[styles.tarjeta, { borderLeftColor: colorBorde }]}>
        <View style={styles.encabezadoTarjeta}>
            <View style={[styles.contenedorIcono, { backgroundColor: colorBorde }]}>
                <FontAwesome name={iconoNombre} size={18} color={isAlert ? '#333' : '#fff'} />
            </View>
            <View style={styles.indicadorEstado} />
        </View>
        <Text style={styles.tituloTarjeta}>{titulo}</Text>
        <Text style={styles.mensajeTarjeta}>{mensaje}</Text>
        <Text style={styles.fechaTarjeta}>{fecha}</Text>
    </View>
);

export default function NotificacionesScreen() 
{
    return (
        <SafeAreaView style={styles.areaSegura}>
            <View style={styles.encabezado}>
                <TouchableOpacity style={styles.botonEncabezado}>
                    <FontAwesome name="user-circle-o" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.tituloEncabezado}>NOTIFICACIONES</Text>
                <TouchableOpacity style={styles.botonEncabezado}>
                    <FontAwesome name="bell-o" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.contenedorNotificaciones}>
                <TarjetaNotificacion
                    iconoNombre="exclamation-triangle"
                    titulo="Presupuesto casi alcanzado"
                    mensaje="Has gastado el 90% de tu presupuesto de Alimentación"
                    fecha="2025-11-04"
                    colorBorde="#FFC107"
                    isAlert={true}
                />

                <TarjetaNotificacion
                    iconoNombre="info-circle"
                    titulo="Pago programado"
                    mensaje="Tienes un pago de servicios pendiente para el 15 de noviembre"
                    fecha="2025-11-04"
                    colorBorde="#2196F3"
                    isAlert={false}
                />

                <TarjetaNotificacion
                    iconoNombre="check-circle"
                    titulo="Meta alcanzada"
                    mensaje="Has cumplido tu meta de ahorro del mes pasado"
                    fecha="2025-11-01"
                    colorBorde="#4CAF50"
                    isAlert={false}
                />
            </View>
            
            <View style={styles.piePagina}>
                <TouchableOpacity style={styles.itemPiePagina}>
                    <FontAwesome name="list-ul" size={20} color="#999" />
                    <Text style={styles.textoPiePagina}>TRANSACCIONES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemPiePagina}>
                    <FontAwesome name="home" size={20} color="#0e620dff" />
                    <Text style={[styles.textoPiePagina, styles.textoPiePaginaActivo]}>INICIO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemPiePagina}>
                    <FontAwesome name="cog" size={20} color="#999" />
                    <Text style={styles.textoPiePagina}>AJUSTES</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create(
{
    areaSegura: 
    {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    encabezado: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0e620dff',
        paddingHorizontal: 15,
        height: 60,
        paddingTop: 10,
    },
    
    botonEncabezado: 
    {
        padding: 5,
    },

    tituloEncabezado: 
    {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },

    contenedorNotificaciones: 
    {
        flex: 1,
        padding: 10,
    },

    tarjeta: 
    {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 5, 
        elevation: 1, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },

    encabezadoTarjeta: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },

    contenedorIcono: 
    {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    indicadorEstado: 
    {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
        alignSelf: 'flex-start',
    },
    
    tituloTarjeta: 
    {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },

    mensajeTarjeta: 
    {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },

    fechaTarjeta: 
    {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
    },

    piePagina: 
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        paddingVertical: 8,
    },

    itemPiePagina: 
    {
        alignItems: 'center',
        padding: 5,
    },

    textoPiePagina: 
    {
        fontSize: 12,
        color: '#666',
    },

    textoPiePaginaActivo:
    {
        color: '#0e620dff', 
        fontWeight: 'bold',
    }
});