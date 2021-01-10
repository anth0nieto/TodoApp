import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GREEN_COLOR, RED_DARK_COLOR} from '../../constants/colors';

function Todo({
  name,
  tasks,
  color = 'white',
  index,
  selected = false,
  favorite = false,
  onPress = () => {},
  onLongPress = () => {},
  onPressOut = () => {},
  onFavoritePress = () => {},
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      style={{
        ...styles.container,
        backgroundColor: color,
        marginLeft: index % 2 === 0 ? wp(5) : 0,
        marginRight: index % 2 === 0 ? 0 : wp(5),
      }}>
      {selected && (
        <View style={styles.selectedContainer}>
          <AntDesign name="check" size={hp(2)} color={GREEN_COLOR} />
        </View>
      )}

      <TouchableOpacity
        style={styles.favoriteContainer}
        onPress={onFavoritePress}>
        {favorite ? (
          <MaterialIcons name="favorite" size={hp(2)} color={RED_DARK_COLOR} />
        ) : (
          <MaterialIcons
            name="favorite-border"
            size={hp(2)}
            color={RED_DARK_COLOR}
          />
        )}
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          ...styles.scrollContent,
          backgroundColor: selected ? 'rgba(255,255,255, 0.6)' : 'transparent',
        }}>
        <Text style={styles.title}>{name}</Text>
        {tasks &&
          tasks.map((value, key) => (
            <View key={key} style={styles.taskContainer}>
              <Text style={styles.taskText}>
                ›{' '}
                <Text
                  style={{
                    textDecorationLine: value.selected
                      ? 'line-through'
                      : 'none',
                  }}>
                  {value.task}
                </Text>
              </Text>
            </View>
          ))}
      </ScrollView>
    </TouchableOpacity>
  );
}

export default Todo;
