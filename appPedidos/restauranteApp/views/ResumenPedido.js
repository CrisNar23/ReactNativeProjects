import React, { useContext, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { 
  Container, 
  Content, 
  List, 
  ListItem, 
  Thumbnail, 
  Text, 
  Left, 
  Body, 
  Button, 
  H1, 
  Footer, 
  FooterTab, 
  Right,
  Icon
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import firebase from '../firebase'

import PedidosContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

  const navigation = useNavigation()

  //Context de pedido
  const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidosContext)

  useEffect(() => {
    calcularTotal()
  }, [pedido])

  const calcularTotal = () => {
    let nuevoTotal = 0
    nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0)
    mostrarResumen(nuevoTotal);

  }

  //Redirecciona a progreso pedido
  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realizas tu pedido, no podrás cambiarlo',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            //Crear un objeto
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido, //Array
              creado: Date.now()
            }
            console.log(pedidoObj);
            
            try {
              const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
              pedidoRealizado(pedido.id)
              navigation.navigate('ProgresoPedido')             
            } catch (error) {
              console.log(error)              
            }           
          }
        },
        {
          text: 'Revisar', style: 'cancel'
        }
      ]
    )
  }

  //Eliminar un producto del arreglo de pedido pedido
  const confirmarEliminacion = id => {
    Alert.alert(
      '¿Deseas eliminar este artículo?',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Eliminar del state
            eliminarProducto(id)

            //Calcular

          }
        },
        {
          text: 'Cancelar', style: 'cancel'
        }
      ]
    )
  }

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
        {pedido.map((platillo, i) => {
          const { cantidad, nombre, imagen, id, precio } = platillo

          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large source={{ uri: imagen }} />
                </Left>

                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad: {cantidad}</Text>
                  <Text>Precio: ${precio}</Text>
                </Body>

                <Right>
                    <Button
                      full
                      danger
                      onPress={() => confirmarEliminacion(id)}
                    >
                      <Icon style={[globalStyles.botonTexto, { color: '#FFF' }]} name='trash' />
                    </Button>
                  </Right>
              </ListItem>
            </List>
          )
        })}

        <Text style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>

        <Button
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate('Menu')}
          full
          dark
        >
          <Text style={[globalStyles.botonTexto, { color: '#FFF' }]}>Seguir Pidiendo</Text>
        </Button>
      </Content>

      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.boton}
            onPress={() => progresoPedido()}
          >
            <Text style={globalStyles.botonTexto}>Realizar Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default ResumenPedido;