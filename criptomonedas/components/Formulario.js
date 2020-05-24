import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({ moneda, criptomoneda, guardarMoneda ,guardarCriptomoneda, guardarConsultarAPI}) => {

  const [criptomonedas, guardarCriptomonedas] = useState([])

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const resultado = await axios.get(url)
      guardarCriptomonedas(resultado.data.Data)

    }

    consultarAPI()
  }, [])

  const obtenerMoneda = moneda => {
    guardarMoneda(moneda)
  }

  const obtenerCriptomoneda = cripto => {
    guardarCriptomoneda(cripto)
  }

  const cotizarPrecio = () => {
    if(moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta()
      return
    }  
    
    //Cambiar el staate de consultarAPI
    guardarConsultarAPI(true)
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error...',
      'Todos los campos son obligatorios',
      [
        {text: 'OK'}
      ]
    )
  }

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}
      >
        <Picker.Item label='-- Seleccione una opción --' value='' />
        <Picker.Item label='Dolar de Estados Unidos' value='USD' />
        <Picker.Item label='Peso Colombiano' value='COP' />
        <Picker.Item label='Euro' value='EUR' />
        <Picker.Item label='Libra Esterlina' value='GBP' />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={cripto => obtenerCriptomoneda(cripto)}
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label='-- Seleccione una opción --' value='' />
        {criptomonedas.map(cripto => (
          <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
        ))}
      </Picker>

      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20
  },
  textoCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})

export default Formulario;