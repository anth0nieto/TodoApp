import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SimpleLineIcons, MaterialIcons} from '@expo/vector-icons';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {AuthContext} from '../../navigators/context';
import {styles} from './styles';
import {logout, resetState} from '../../store/actions/AuthActions';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RED_DARK_COLOR, SECONDARY_COLOR} from '../../constants/colors';

function DrawerContent({navigation, userInfo, logout, resetState}) {
  const {signOut} = useContext(AuthContext);

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.avatartSection}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{uri: userInfo.photo.url}} />
        </View>
        <Text style={styles.textName} numberOfLines={1}>
          {userInfo.name}
        </Text>
        <Text style={styles.textEmail} numberOfLines={1}>
          {userInfo.email}
        </Text>
      </View>
      <View style={styles.navigationContent}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{...styles.rowContainer, marginTop: hp(2)}}>
          <View style={styles.itemContainer}>
            <SimpleLineIcons name="list" size={hp(3)} color={SECONDARY_COLOR} />
          </View>

          <View style={styles.textContainer}>
            <Text>Todos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Favorites');
          }}
          style={styles.rowContainer}>
          <View style={styles.itemContainer}>
            <MaterialIcons
              name="favorite-border"
              size={hp(3)}
              color={RED_DARK_COLOR}
            />
          </View>

          <View style={styles.textContainer}>
            <Text>Favoritos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
            resetState();
            signOut('Las sesión se ha cerrado con éxito, hasta pronto 👋');
          }}
          style={styles.rowContainer}>
          <View style={styles.itemContainer}>
            <SimpleLineIcons name="logout" color="black" size={hp(3)} />
          </View>

          <View style={styles.textContainer}>
            <Text>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout,
      resetState,
    },
    dispatch,
  );
}

export default compose(
  connect((state) => {
    return {
      userInfo: state.Auth.user.userInfo,
    };
  }, mapDispatchToProps),
)(DrawerContent);
