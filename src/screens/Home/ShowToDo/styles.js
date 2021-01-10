import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GREEN_COLOR, SECONDARY_COLOR} from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    padding: wp(5),
  },
  inputContainer: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: hp(2),
    borderBottomColor: '#bbb',
    borderBottomWidth: wp('0.3%'),
  },
  input: {
    paddingLeft: wp('2%'),
    paddingVertical: hp(0.5),
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: 'black',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(0.4),
  },
  textOption: {
    flex: 1,
    fontSize: hp(2.5),
    marginLeft: wp(5),
    textAlign: 'left',
    color: 'black',
  },
  checked: {
    textDecorationLine: 'line-through',
  },
  iconContainer: {
    marginLeft: wp(5),
  },
  dateContainer: {
    position: 'absolute',
    bottom: wp(5),
    left: wp(5),
    justifyContent: 'center',
  },
  textDate: {
    fontSize: hp(2),
    color: 'gray',
  },
  saveButton: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(8),
    height: wp(8),
    backgroundColor: GREEN_COLOR,
    borderRadius: wp(2),
  },
  addButton: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(7),
    height: wp(7),
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 500,
  },
  trashIcon: {
    alignSelf: 'flex-end',
  },
});
/*

*/
