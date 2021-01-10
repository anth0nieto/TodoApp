import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PRIMARY_COLOR} from '../../constants/colors';
import styles from './styles';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={hp(6)} color={PRIMARY_COLOR} />
      <Text style={styles.text}>Iniciando Sesión</Text>
    </View>
  );
}
