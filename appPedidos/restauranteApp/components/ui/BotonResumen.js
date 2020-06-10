import React, { useContext } from 'react';
import { Button, Text, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import PedidosContext from '../../context/pedidos/pedidosContext';
import globalStyles from '../../styles/global';

const BotonResumen = () => {

  const navigation = useNavigation()

  //Leer el objeto de pedido
  const { pedido } = useContext(PedidosContext)

  if (pedido.length === 0) return null

  return (
    <Button
      style={globalStyles.boton}
      onPress={() => navigation.navigate('ResumenPedido')}
    >
      <Icon style={globalStyles.botonTexto} name='cart' />
    </Button>
  );
}
//<Text style={globalStyles.botonTexto}>Ver Pedido</Text>
export default BotonResumen;