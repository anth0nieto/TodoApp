import {StyleSheet, Platform} from 'react-native';
import {PRIMARY_COLOR} from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    height: hp(30),
    borderRadius: wp(3),
    justifyContent: 'center',
    maxWidth: wp(42.5),
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
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
  },
  scrollContent: {
    padding: hp(2),
    borderRadius: wp(3),
  },
  selectedContainer: {
    position: 'absolute',
    top: -hp(1),
    right: -hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    height: hp(3),
    width: hp(3),
    backgroundColor: 'white',
    zIndex: 9999,
  },
  favoriteContainer: {
    position: 'absolute',
    bottom: hp(2),
    right: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    height: hp(3),
    width: hp(3),
    backgroundColor: 'white',
    zIndex: 9999,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
  },
  separator: {
    alignSelf: 'center',
    width: wp(70),
    backgroundColor: '#bbb',
    height: hp(0.2),
    borderRadius: 500,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  taskText: {
    fontSize: hp(2.2),
    fontWeight: '100',
    marginLeft: wp(2),
  },
  dateContainer: {
    position: 'absolute',
    bottom: 0,
    right: wp(5),
  },
  createdDate: {
    fontSize: hp(2),
    color: '#bbb',
  },
});
