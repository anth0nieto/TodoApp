import React from 'react';
import {LogBox} from 'react-native';
import {AppLoading} from 'expo';
import {useAssets} from 'expo-asset';
import {
  useFonts,
  LobsterTwo_400Regular,
  ArchivoNarrow_700Bold,
} from '@expo-google-fonts/dev';
import MainApp from './src/Main';
import * as images from './src/constants/images';

LogBox.ignoreLogs(['Setting a timer']);
export default function App() {
  let [assets] = useAssets([images.LOGO_ICON, images.GOOGLE_ICON]);
  let [fontsLoaded] = useFonts({
    LobsterTwo_400Regular,
    ArchivoNarrow_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <MainApp />;
  }
}
