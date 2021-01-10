import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Ionicons} from '@expo/vector-icons';
import {styles} from './styles';

function Header({
  leftIcon = (
    <Ionicons name="ios-arrow-round-back" size={hp(4)} color={'white'} />
  ),
  rightIcon = <Ionicons name="ios-menu" size={hp(4)} color={'white'} />,
  backAction = () => {},
  menuAction = () => {},
  title = '',
  hideBack = true,
  hideMenu = true,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          backAction();
        }}
        disabled={hideBack}>
        {!hideBack ? leftIcon : null}
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.text}>{title}</Text>
      </View>

      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          menuAction();
        }}
        disabled={hideMenu}>
        {!hideMenu ? rightIcon : null}
      </TouchableOpacity>
    </View>
  );
}

export default Header;
