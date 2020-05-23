import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false)

  //Definir el state de citas
  const [citas, setCitas] = useState([])

  //Elimina los pacientes de state
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  //Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm)
  }

  //Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Mi Mascota App</Text>

        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar' : 'Añadir Cita'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
              />
            </>
          ) : (
              <>
                <Text style={styles.titulo}>
                  {citas.length > 0 ? 'Administrar citas' : 'No hay citas, agrega una'}
                </Text>
                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({ item }) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
                  keyExtractor={cita => cita.id}
                />
              </>
            )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#0B614B',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#FFBF00',
    marginVertical: 10
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default App;
