import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Fontisto, SimpleLineIcons} from '@expo/vector-icons';
import {styles} from './styles';
import {RED_COLOR, SECONDARY_COLOR} from '../../constants/colors';

function FabButton({onPress = () => {}, selectedMultiple = false}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.fabButton,
        backgroundColor: selectedMultiple ? RED_COLOR : SECONDARY_COLOR,
      }}
      activeOpacity={0.8}
      onPress={() => {
        onPress();
      }}>
      {selectedMultiple ? (
        <SimpleLineIcons name="trash" size={wp(5)} color="white" />
      ) : (
        <Fontisto name="plus-a" size={wp(5)} color={'white'} />
      )}
    </TouchableOpacity>
  );
}

FabButton.propTypes = {
  selectedMultiple: PropTypes.bool,
  onPress: PropTypes.func,
};

FabButton.defaultProps = {
  selectedMultiple: false,
};

export default FabButton;
