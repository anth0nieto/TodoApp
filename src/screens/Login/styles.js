import {StyleSheet, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {PRIMARY_COLOR} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(5),
    backgroundColor: 'white',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(45),
    height: wp(45),
    resizeMode: 'contain',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: hp(6),
    color: 'black',
    marginTop: hp(10),
    fontFamily: 'ArchivoNarrow_700Bold',
  },
  subtitle: {
    fontSize: hp(2.2),
    color: 'black',
    marginTop: hp(2),
    fontFamily: 'LobsterTwo_400Regular',
  },
  button: {
    width: wp(85),
    height: hp(7),
    backgroundColor: 'white',
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
  },
  imageGoogleContainer: {
    marginLeft: wp(2),
    width: wp(15),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp(8),
    alignSelf: 'center',
    height: wp(8),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    marginLeft: wp(10),
    textAlign: 'left',
  },
});
