import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import Header from '@components/Header';
import styles from './styles';
import database from '../../../config/firebase';
import {SECONDARY_COLOR} from '../../../constants/colors';
import {showToast} from '@utils';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';

const dbRef = database.ref();

function ShowToDo({navigation, userInfo, route}) {
  const {todoItem} = route.params;
  const [name, setName] = useState(todoItem.name);
  const [tasks, setTasks] = useState(todoItem.tasks ?? []);
  const [task, setTask] = useState('');
  const todoRef = dbRef.child(`user-${userInfo.id}/todos/${todoItem.id}`);

  const toogleElement = (index) => {
    var todoTasks = [...tasks];
    todoTasks[index].selected = !todoTasks[index].selected;
    setTasks(todoTasks);

    updateTask(index, todoTasks[index]);
  };

  const addTask = () => {
    if (task !== '') {
      var newTask = {task, selected: false, date: new Date()};
      const tasksArray = [...tasks, newTask];
      setTasks(tasksArray);
      setTask('');
      refreshTasks(tasksArray);
    } else {
      showToast({
        type: 'error',
        title: 'To do',
        message: 'Error al crear To do, no puede estar vacío 🚨',
      });
    }
  };

  const removeTask = (pos) => {
    const array = [...tasks];
    array.splice(pos, 1);
    setTasks(array);
    refreshTasks(array);
  };

  const editName = () => {
    return new Promise((resolve, reject) => {
      todoRef
        .child('name')
        .set(name)
        .then((result) => {
          resolve(true);
          showToast({
            type: 'success',
            title: 'To do',
            message: 'El nombre se actualizo con éxito ✅',
          });
        })
        .catch((err) => {
          reject(false);
          showToast({
            type: 'error',
            title: 'To do',
            message: 'Error al actualizar todo',
          });
        });
    });
  };

  const updateTask = (index, value) => {
    return new Promise((resolve, reject) => {
      todoRef
        .child(`tasks/${index}`)
        .update(value)
        .then((result) => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  };

  const removeTodo = () => {
    Alert.alert(
      'Eliminar Todo',
      `Esta seguro de que desea eliminar el To do ${name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'Seguro', onPress: () => deleteTodo()},
      ],
      {cancelable: false},
    );
  };

  const deleteTodo = () => {
    return new Promise((resolve, reject) => {
      todoRef
        .remove()
        .then((result) => {
          resolve(true);
          showToast({
            type: 'success',
            title: 'To do',
            message: 'To do eliminado con éxito ❌',
          });
          navigation.goBack();
        })
        .catch((err) => {
          reject(false);
          showToast({
            type: 'error',
            title: 'To do',
            message: 'Error al eliminar To do 😶',
          });
        });
    });
  };

  const refreshTasks = (newTasks) => {
    return new Promise((resolve, reject) => {
      todoRef
        .child('tasks')
        .set(newTasks)
        .then((result) => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        hideBack={false}
        hideMenu={false}
        title={name}
        backAction={() => {
          navigation.goBack();
        }}
        rightIcon={
          <MaterialCommunityIcons name="delete" size={hp(4)} color="white" />
        }
        menuAction={() => {
          removeTodo();
        }}
      />

      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Nombre'}
            value={name}
            underlineColorAndroid="transparent"
            returnKeyType="go"
            onChangeText={(value) => {
              setName(value);
            }}
            onBlur={editName}
          />
        </View>

        <View style={{...styles.inputContainer, marginBottom: hp(2)}}>
          <TextInput
            style={{...styles.input, paddingRight: wp(10)}}
            placeholder={'Agrega una tarea'}
            value={task}
            onChangeText={(value) => {
              setTask(value);
            }}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <MaterialIcons name="add" size={hp(3)} color="white" />
          </TouchableOpacity>
        </View>

        {tasks && tasks.length > 0 && (
          <FlatList
            style={{marginBottom: hp(5)}}
            data={tasks}
            renderItem={({item, index}) => (
              <View key={`task-show-${index}`} style={styles.option}>
                <TouchableOpacity
                  onPress={() => {
                    toogleElement(index);
                  }}
                  style={styles.iconContainer}>
                  {item.selected ? (
                    <MaterialIcons
                      name="check-box"
                      size={hp(3)}
                      color={SECONDARY_COLOR}
                    />
                  ) : (
                    <MaterialIcons
                      name="check-box-outline-blank"
                      size={hp(3)}
                      color={SECONDARY_COLOR}
                    />
                  )}
                </TouchableOpacity>

                <Text
                  style={{
                    ...styles.textOption,
                    textDecorationLine: item.selected ? 'line-through' : 'none',
                  }}>
                  {item.task}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    removeTask(index);
                  }}
                  style={styles.iconContainer}>
                  <SimpleLineIcons name="trash" size={hp(3)} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        <View style={styles.dateContainer}>
          <Text style={styles.textDate}>
            Created date: {todoItem.createdDate}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default compose(
  connect((state) => {
    return {
      userInfo: state.Auth.user.userInfo,
    };
  }, mapDispatchToProps),
)(ShowToDo);
