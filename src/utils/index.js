import Toast from 'react-native-toast-message';

export function showToast({
  type = 'error',
  message = 'Error deconocido',
  title = 'Login',
  position = 'top',
  visibilityTime = 3000,
}) {
  Toast.show({
    type,
    position,
    text1: title,
    text2: message,
    visibilityTime,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    onShow: () => {},
    onHide: () => {},
  });
}

export const generateDispatch = (type, payload) => {
  return {
    type,
    payload,
  };
};
