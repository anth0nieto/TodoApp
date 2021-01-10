import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  GREEN_COLOR,
  PURPLE_COLOR,
  SECONDARY_COLOR,
} from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    width: wp('85%'),
    marginTop: hp('0.7%'),
    marginBottom: hp('0.7%'),
    borderBottomColor: '#bbb',
    borderBottomWidth: wp('0.3%'),
  },
  input: {
    paddingLeft: wp('2%'),
    paddingVertical: hp(0.5),
    fontSize: hp(2.5),
    color: 'black',
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
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: wp(3),
    justifyContent: 'center',
    maxHeight: hp(55),
    padding: hp(2),
    width: wp(85),
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
    marginTop: hp(5),
  },
  saveButton: {
    backgroundColor: SECONDARY_COLOR,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(2.5),
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  taskText: {
    fontSize: hp(2),
    fontWeight: '100',
    marginLeft: wp(2),
  },
  icontContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
/*

*/
