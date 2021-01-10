import {StyleSheet, Platform} from 'react-native';
import {PRIMARY_COLOR} from '../../constants/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7),
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: hp(3),
    color: 'white',
    textAlign: 'center',
    fontFamily: 'ArchivoNarrow_700Bold',
  },
});
