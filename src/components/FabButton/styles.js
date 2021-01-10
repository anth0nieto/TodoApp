import {StyleSheet, Platform} from 'react-native';
import {SECONDARY_COLOR} from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  fabButton: {
    position: 'absolute',
    bottom: hp('4%'),
    right: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    width: wp(15),
    height: wp(15),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});
