import React, {useContext} from 'react';
import {Text, View, Image, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logInUser} from '../../store/actions/AuthActions';
import {AuthContext} from '../../navigators/context';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {GOOGLE_ICON, LOGO_ICON} from '../../constants/images';
import styles from './styles';
import {queryStatus, responseType} from '../../store/types';
import {showToast} from '../../utils';
import LoadingModal from '../../components/LoadingModal/LoadingModal';

function Login({logInUser, status}) {
  const {signIn} = useContext(AuthContext);
  const login = async () => {
    logInUser().then((response) => {
      if (response.status === responseType.SUCCESS) {
        signIn(response.data.token, `Hola ${response.data.name} 👋👍`);
      } else {
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Error al logearte, intentalo de nuevo',
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={LOGO_ICON} style={styles.logo} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Todo App</Text>
        <Text style={styles.subtitle}>
          Anota de forma simple tus tareas cotidianas.
        </Text>

        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => {
              login();
            }}
            activeOpacity={0.7}
            style={styles.button}>
            <View style={styles.buttonContent}>
              <View style={styles.imageGoogleContainer}>
                <Image source={GOOGLE_ICON} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Entra con con Google</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {status === queryStatus.LOADING && (
        <LoadingModal visible={status === queryStatus.LOADING} />
      )}
    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logInUser,
    },
    dispatch,
  );
}

export default compose(
  connect((state) => {
    return {
      status: state.Auth.status,
      user: state.Auth.user.userInfo,
    };
  }, mapDispatchToProps),
)(Login);
