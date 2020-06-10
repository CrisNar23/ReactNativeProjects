import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Form, Icon, Button, Input, Text, Col, Grid, Footer, FooterTab } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidosContext from '../context/pedidos/pedidosContext';


const FormularioPlatillo = () => {

  const [cantidad, guardarCantidad] = useState(1)
  const [total, guardarTotal] = useState(0)

  //Context
  const { platillo, guardarPedido } = useContext(PedidosContext)
  const { precio } = platillo

  //Redireccionar
  const navigation = useNavigation()

  //En cuanto carga, calcular total
  useEffect(() => {
    calcularTotal()
  }, [cantidad])

  //Calcula el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * cantidad
    guardarTotal(totalPagar)
  }

  //Disminuir cantidad
  const disminuirCantidad = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1
      guardarCantidad(nuevaCantidad)
    }
  }

  //Aumentar cantidad
  const aumentarCantidad = () => {
    const nuevaCantidad = parseInt(cantidad) + 1
    guardarCantidad(nuevaCantidad)
  }

  //Confirma si la orden es correcta
  const confirmarOrden = () => {
    Alert.alert(
      'Deseas confirmar tu pedido?',
      'Un pedido confirmado ya no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total
            }
            guardarPedido(pedido)

            //Navegar hacia el resumen
            navigation.navigate('ResumenPedido')
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={{ height: 80, justifyContent: 'center' }}
                onPress={() => disminuirCantidad()}
              >
                <Icon style={{ fontSize: 40 }} name='remove' />
              </Button>
            </Col>
            <Col>
              <Input
                style={{ textAlign: 'center', fontSize: 20 }}
                value={cantidad.toString()}
                keyboardType='numeric'
                onChangeText={cantidad => guardarCantidad(cantidad)}
              />
            </Col>
            <Col>
              <Button
                props
                dark
                style={{ height: 80, justifyContent: 'center' }}
                onPress={() => aumentarCantidad()}
              >
                <Icon style={{ fontSize: 40 }} name='add' />
              </Button>
            </Col>
          </Grid>

          <Text style={globalStyles.cantidad}>Subtotal: ${total}</Text>
        </Form>
      </Content>

      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.boton}
            onPress={() => confirmarOrden()}
          >
            <Text style={globalStyles.botonTexto}>Agragar al Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default FormularioPlatillo;