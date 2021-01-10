import React, {useState} from 'react';
import {Text, View, Modal, ActivityIndicator} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {PRIMARY_COLOR} from '../../constants/colors';
import styles from './styles';

const LoadingModal = ({visible = false, setVisible = () => {}}) => {
  const [dismiss, setDismiss] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={visible && !dismiss}
      onBackdropPress={() => setDismiss(true)}>
      <View style={styles.container}>
        <ActivityIndicator color={PRIMARY_COLOR} size={hp(7.5)} />
        <Text style={styles.text}>Cargando ...</Text>
      </View>
    </Modal>
  );
};

export default LoadingModal;
