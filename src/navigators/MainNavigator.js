import React, {useEffect, useMemo, useReducer} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from './context';
import {getUser, logout, resetState} from '../store/actions/AuthActions';

// <--- Components --->
import Drawer from '@components/Drawer';
import Loading from '@components/Loading';

// <--- Auth Stack --->
import Login from '@screens/Login';

// <--- App Drawer --->
import Home from '@screens/Home';
import CreateToDo from '@screens/Home/CreateToDo';
import ShowToDo from '@screens/Home/ShowToDo';
import Favorites from '@screens/Favorites';
import {responseType} from '../store/types';
import {showToast} from '../utils';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

const AppStack = createStackNavigator();
const HomeScreens = () => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="CreateToDo" component={CreateToDo} />
    <AppStack.Screen name="ShowToDo" component={ShowToDo} />
  </AppStack.Navigator>
);

const FavoriteScreens = () => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen name="Favorites" component={Favorites} />
    <AppStack.Screen name="CreateToDo" component={CreateToDo} />
    <AppStack.Screen name="ShowToDo" component={ShowToDo} />
  </AppStack.Navigator>
);

const DrawerNavigator = createDrawerNavigator();
const DrawerScreen = (props) => (
  <DrawerNavigator.Navigator
    headerMode="none"
    drawerPosition="right"
    drawerContent={() => <Drawer {...props} />}
    initialRouteName="Home">
    <DrawerNavigator.Screen name="Home" component={HomeScreens} />
    <DrawerNavigator.Screen name="Favorites" component={FavoriteScreens} />
  </DrawerNavigator.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

function AppContainer({accessToken, getUser, user}) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const authContext = useMemo(
    () => ({
      signIn: async (token, message = undefined) => {
        if (message) {
          showToast({
            type: 'success',
            title: 'Bienvenido',
            message,
          });
        }
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({type: 'SIGN_IN', token});
      },
      signOut: (message = undefined) => {
        if (message) {
          showToast({
            type: 'success',
            title: 'Sesión',
            message,
          });
        }

        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async (token) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({type: 'SIGN_IN', token});
      },
    }),
    [],
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        if (accessToken) {
          getUser(accessToken).then((response) => {
            if (response.status === responseType.SUCCESS) {
              dispatch({type: 'RESTORE_TOKEN', token: accessToken});
              showToast({
                type: 'success',
                title: 'Bienvenido',
                message: `Hola ${user.name} 👋👍`,
              });
            } else {
              authContext.signOut(
                'El token expiro, inicia sesión nuevamente 👍',
              );
            }
          });
        } else {
          authContext.signOut();
        }
      } catch (e) {
        authContext.signOut('Error al cargar el token 🚫');
        // Restoring token failed
      }

      //dispatch({type: 'RESTORE_TOKEN', token: 'token'});
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, []);

  if (state.isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={state.userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUser,
      logout,
      resetState,
    },
    dispatch,
  );
}

export default compose(
  connect((state) => {
    return {
      accessToken: state.Auth.accessToken,
      user: state.Auth.user.userInfo,
      status: state.Auth.user.status,
    };
  }, mapDispatchToProps),
)(AppContainer);
