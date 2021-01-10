import {StyleSheet, Platform} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {PRIMARY_COLOR} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatartSection: {
    height: hp('30%'),
    width: '100%',
    padding: hp('2%'),
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    borderBottomWidth: hp('0.1%'),
    borderBottomColor: '#bbb',
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
  avatarContainer: {
    height: hp('15%'),
    width: hp('15%'),
    borderRadius: 500,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 500,
    resizeMode: 'contain',
  },
  textName: {
    fontSize: hp(3),
    color: 'white',
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  textEmail: {
    fontSize: hp(2),
    color: 'white',
    fontWeight: '100',
    marginTop: hp('1%'),
  },
  navigationContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: hp('1%'),
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  logout: {
    position: 'absolute',
    top: hp('1%'),
    left: hp('1%'),
    padding: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
