import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { windowWidth } from '../utils/Dimensions';
import { imageMapping } from '../data/ImageMapping';

export default function ListItem({ title, description, price, onPress, isLoading, stock }) {
  if (isLoading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  const photo = imageMapping[title] || require('../assets/images/misc/username.png');

  return (
    <View style={{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source={photo}
          style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
        />
        <View style={{width: windowWidth - 220}}>
          <Text
            numberOfLines={1}
            style={{
              color: '#0A0A0F',
              fontSize: 17,
              fontWeight: 700,
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: '#0A0A0F',
              fontSize: 14,
            }}>
            Stock: {stock}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPress} style={{
        backgroundColor:'#0aada8',
        padding:10,
        width: 100,
        borderRadius: 10,
      }}>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 14,
        }}>{price}
        </Text>
      </TouchableOpacity>
    </View>
  );
}