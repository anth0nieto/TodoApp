import React from 'react';
import AppContainer from './navigators/MainNavigator';
import {StyleSheet, View, StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {store, persistor} from './store';

function MainApp() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <AppContainer />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
      </PersistGate>
    </Provider>
  );
}

export default MainApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
