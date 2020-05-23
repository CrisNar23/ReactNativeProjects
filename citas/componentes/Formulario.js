import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import shortid from 'shortid';
import momentTranslationEs from '../Utilidades/momentTranslationES';


const Formulario = ({citas, setCitas, guardarMostrarForm}) => {

  const [paciente, guardarPaciente] = useState('')
  const [propietario, guardarPropietario] = useState('')
  const [telefono, guardarTelefono] = useState('')
  const [fecha, guardarFecha] = useState('')
  const [hora, guardarHora] = useState('')
  const [sintomas, guardarSintomas] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const confirmarFecha = (date) => {
    //Convertir la fecha a español
    moment.locale('es')
    hideDatePicker()
    guardarFecha(moment(date).format('LL'))
  }

  //Muestra u oculta el Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true)
  }

  const hideTimePicker = () => {
    setTimePickerVisibility(false)
  }

  const confirmarHora = (hora) => {
    hideTimePicker()
    guardarHora(moment(hora).format('LT'))
  }

  //Crear nueva cita
  const crearNuevaCita = () => {

    //Validar campos vacios
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      //Falla la validación
      mostrarAlerta()
      return
    }

    //Crear una nueva cita
    const cita = { paciente, propietario, telefono, fecha, hora, sintomas }

    cita.id = shortid.generate()
    console.log(cita);

    //Agregar al state
    const citasNuevo = [...citas, cita]
    setCitas(citasNuevo)

    //Ocultar el formulario
    guardarMostrarForm(false)

    //Resetear el formulario
    
  }

  //Muestra la alerta si falla validación
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //Titulo
      'Todos los campos son obligatorios', //Mensaje
      [{
        text: 'Ok' //Arreglo de botones
      }]
    )
  }

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPaciente(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Propietario:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPropietario(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Teléfono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarTelefono(texto)}
            keyboardType='numeric'
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale={'es_ES'}
            headerTextIOS='Elige una fecha'
            cancelTextIOS={'Cancelar'}
            confirmTextIOS={'Confirmar'}
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale={'es_ES'}
            headerTextIOS='Elige una Hora'
            cancelTextIOS={'Cancelar'}
            confirmTextIOS={'Confirmar'}
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Síntomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => guardarSintomas(texto)}
          />
        </View>

        <View>
          <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
  },
  input: {
    marginTop: 1,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#0B614B',
    marginVertical: 10
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default Formulario;