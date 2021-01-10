import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AntDesign} from '@expo/vector-icons';
import Header from '@components/Header';
import {MaterialIcons} from '@expo/vector-icons';
import {showToast} from '@utils';
import database from '../../../config/firebase';
import styles from './styles';
import moment from 'moment';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';

const dbRef = database.ref();

function CreateToDo({navigation, userInfo}) {
  const [name, setName] = useState('');
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const todosRef = dbRef.child(`user-${userInfo.id}/todos`);

  const createTodo = () => {
    return new Promise((resolve, reject) => {
      todosRef
        .push({
          name: name,
          createdDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
          tasks: todos,
          favorite: false,
        })
        .then((result) => {
          resolve(true);
          showToast({
            type: 'success',
            title: 'To do',
            message: 'To do creado con éxito ✅',
          });
          navigation.goBack();
        })
        .catch((err) => {
          reject(false);
        });
    });
  };

  const addTodo = () => {
    if (todo !== '' && todo.length > 0 && todo.trim() !== '' && name !== '') {
      const todosArray = [
        ...todos,
        {task: todo, selected: false, date: new Date()},
      ];
      setTodos(todosArray);
      setTodo('');
    } else {
      showToast({
        type: 'error',
        title: 'To do',
        message: 'Error al crear To do, no puede estar vacío 🚨',
      });
    }
  };

  const removeTodo = (pos) => {
    const array = [...todos];
    array.splice(pos, 1);
    setTodos(array);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        hideBack={false}
        title={'Crear nuevo To Do'}
        backAction={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Nombre'}
            underlineColorAndroid="transparent"
            returnKeyType="go"
            onChangeText={(value) => {
              setName(value);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={{...styles.input, paddingRight: wp(10)}}
            placeholder={'Agrega una tarea'}
            value={todo}
            underlineColorAndroid="transparent"
            onSubmitEditing={createTodo}
            onChangeText={(value) => {
              setTodo(value);
            }}
          />

          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <MaterialIcons name="add" size={hp(3)} color="white" />
          </TouchableOpacity>
        </View>

        {todos.length > 0 && (
          <>
            <View style={styles.cardContainer}>
              <ScrollView>
                {todos.map((value, key) => (
                  <View
                    style={styles.taskContainer}
                    keyExtractor={(key) => key.id.toString()}
                    key={`todo-create-${key}`}>
                    <TouchableOpacity
                      onPress={() => {
                        removeTodo(key);
                      }}
                      style={styles.icontContainer}>
                      <AntDesign name="close" size={hp(3)} color="red" />
                    </TouchableOpacity>

                    <Text style={styles.taskText}>{value.task}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </>
        )}

        {name !== '' && (
          <TouchableOpacity style={styles.saveButton} onPress={createTodo}>
            <Text style={styles.textButton}>Guardar</Text>
          </TouchableOpacity>
        )}
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
)(CreateToDo);
