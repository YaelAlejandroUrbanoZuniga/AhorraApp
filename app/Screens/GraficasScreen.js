import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

const BotonPestana = ({ titulo, activo }) => (
    <TouchableOpacity style={[styles.botonPestana, activo && styles.botonPestanaActivo]}>
        <Text style={[styles.textoPestana, activo && styles.textoPestanaActivo]}>
            {titulo}
        </Text>
    </TouchableOpacity>
);

const LeyendaItem = ({ color, categoria, monto }) => (
    <View style={styles.contenedorLeyendaItem}>
        <View style={[styles.indicadorColor, { backgroundColor: color }]} />
        <Text style={styles.textoLeyendaCategoria}>{categoria}</Text>
        <Text style={styles.textoLeyendaMonto}>{monto}</Text>
    </View>
);

export default function GraficasScreen() 
{
    const datosGrafica = [
        { color: '#4CAF50', categoria: 'Alimentación', monto: '$450.00' },
        { color: '#8BC34A', categoria: 'Transporte', monto: '$120.00' },
        { color: '#CDDC39', categoria: 'Entretenimiento', monto: '$80.00' },
    ];

    return (
        <SafeAreaView style={styles.areaSegura}>
            <View style={styles.encabezado}>
                <TouchableOpacity style={styles.botonEncabezado}>
                    <FontAwesome name="user-circle-o" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.tituloEncabezado}>GRÁFICAS</Text>
                <TouchableOpacity style={styles.botonEncabezado}>
                    <FontAwesome name="bell-o" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contenedorPrincipal}>
                <View style={styles.contenedorPestanas}>
                    <BotonPestana titulo="Gastos" activo={true} />
                    <BotonPestana titulo="Ingresos" activo={false} />
                    <BotonPestana titulo="Presupuestos" activo={false} />
                </View>

                <View style={styles.tarjetaGrafica}>
                    <Text style={styles.subtituloGrafica}>Gastos por Categoría</Text>

                    <Image
                        source={require('../assets/imagen1.png')}
                        style={styles.imagenGraficaCircular}
                        resizeMode="contain"
                    />

                    <View style={styles.contenedorLeyenda}>
                        {datosGrafica.map((item, index) => (
                            <LeyendaItem 
                                key={index}
                                color={item.color}
                                categoria={item.categoria}
                                monto={item.monto}
                            />
                        ))}
                    </View>
                </View>
                
                <View style={styles.tarjetaGrafica}>
                    <Text style={styles.subtituloGrafica}>Ingresos y Egresos por Mes</Text>
                    
                    <Image
                        source={require('../assets/imagen2.png')}
                        style={styles.imagenGraficaBarra}
                        resizeMode="contain"
                    />
                </View>
            </ScrollView>
            
            <View style={styles.piePagina}>
                <TouchableOpacity style={styles.itemPiePagina}>
                    <FontAwesome name="list-ul" size={20} color="#999" />
                    <Text style={styles.textoPiePagina}>Transacciones</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemPiePagina}>
                    <FontAwesome name="home" size={20} color="#999" />
                    <Text style={styles.textoPiePagina}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemPiePagina}>
                    <FontAwesome name="cog" size={20} color="#0e620dff" />
                    <Text style={[styles.textoPiePagina, styles.textoPiePaginaActivo]}>Ajustes</Text>
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

    contenedorPrincipal: 
    {
        padding: 10,
        paddingBottom: 20, 
    },

    contenedorPestanas: 
    {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        padding: 5,
        elevation: 1,
    },

    botonPestana: 
    {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginHorizontal: 5,
    },

    botonPestanaActivo: 
    {
        backgroundColor: '#0e620dff',
    },

    textoPestana: 
    {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    textoPestanaActivo: 
    {
        color: '#fff',
    },

    tarjetaGrafica: 
    {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    subtituloGrafica: 
    {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    imagenGraficaCircular: 
    {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginBottom: 30,
        
    },
    imagenGraficaBarra: 
    {
        height: 250,
        width: '100%',
        alignSelf: 'center',
        
    },

    contenedorLeyenda: 
    {
        marginTop: 10,
        paddingHorizontal: 10,
    },

    contenedorLeyendaItem: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },

    indicadorColor: 
    {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },

    textoLeyendaCategoria: 
    {
        flex: 1,
        fontSize: 15,
        color: '#333',
    },
    
    textoLeyendaMonto: 
    {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },

    piePagina: 
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingBottom: 20, 
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