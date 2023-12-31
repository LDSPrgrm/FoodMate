import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { addToCart } from '../data/Cart';

const FoodDetailsScreen = ({route}) => {
  const [quantity, setQuantity] = useState(1);
  const {userInfo} = useContext(AuthContext);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const addToCartAndRefreshAndNavigate = async () => {
    try {
      await addToCart(userInfo.user_id, route.params?.id, quantity);
      
      Alert.alert(
        'Success!',
        `Successfully added ${quantity} ${quantity > 1 ? 'orders' : 'order'} for ${route.params?.title} to the cart.`,
        [
          { text: 'OK', onPress: () => null },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const BottomNavBar = () => {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
      }}>
        <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        }}>
        <TouchableOpacity onPress={decrementQuantity} disabled={quantity === 1}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: quantity > 1 ? '#C41E3A' : 'gray',
            borderRadius: 50,
            width: 50,
            height: 50,
            marginRight: 10,
          }}>
          <Text style={{
            fontSize: 30,
            color: '#fff'
            }}>-</Text>
          </View>
        </TouchableOpacity>

        <View style={{
          width: 30,
          justifyContent: 'center',
          alignItems: 'center'
          }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 700,
            }}>
            {quantity}
          </Text>
          </View>

        <TouchableOpacity onPress={incrementQuantity} disabled={quantity === 99}>
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: quantity < 99 ? '#3EB075' : 'gray',
            borderRadius: 50,
            width: 50,
            height: 50,
            marginLeft: 10,
          }}>
          <Text style={{
            fontSize: 30, 
            color: '#fff'
            }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <TouchableOpacity onPress={() => addToCartAndRefreshAndNavigate()}
      style={{
          backgroundColor: '#3EB075',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          bottom: 0,
          right: 0,
      }}>
        <Text style={{
          fontSize: 17,
          fontWeight: 700,
          color: 'white',
          width: 150,
          height: 'auto',
          textAlign: 'center'
        }}>Add to Cart</Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  };

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      
        <Text>{route.params?.title}</Text>
        <Text>{route.params?.price}</Text>

        <View style={{
          width: '100%',
          bottom: 'auto',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>{BottomNavBar()}
        </View>
    </View>
  )
}

export default FoodDetailsScreen;