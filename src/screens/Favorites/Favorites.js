import React, {useState, useEffect} from 'react';
import {View, FlatList, Vibration, SafeAreaView} from 'react-native';
import FabButton from '../../components/FabButton';
import {showToast} from '@utils';
import Header from '../../components/Header';
import Todo from '../../components/Todo';
import database from '../../config/firebase';
import {
  GREEN_BLUE_COLOR,
  GREEN_COLOR,
  PINK_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
} from '../../constants/colors';
import styles from './styles';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';

const dbRef = database.ref();
const colors = [
  'white',
  GREEN_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  PINK_COLOR,
  GREEN_BLUE_COLOR,
];

function Favorites({navigation, userInfo}) {
  const [todos, setTodos] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const selectedMultiple = selectedTodos.length > 0;
  const todosRef = dbRef.child(`user-${userInfo.id}/todos`);

  useEffect(() => {
    navigation.addListener('focus', () => {
      updateTodos();
    });
  }, []);

  const updateTodos = () => {
    setSelectedTodos([]);
    setRefreshing(true);
    getTodos().then((response) => {
      setTodos(response);
      setRefreshing(false);
    });
  };

  const selectTodo = (id) => {
    Vibration.vibrate(25);

    var newSelectedTodos = [...selectedTodos];
    if (newSelectedTodos.includes(id)) {
      const index = newSelectedTodos.indexOf(id);
      newSelectedTodos.splice(index, 1);
      setSelectedTodos(newSelectedTodos);
    } else {
      newSelectedTodos.push(id);
      setSelectedTodos(newSelectedTodos);
    }
  };

  const getTodos = () => {
    return new Promise((resolve, reject) => {
      var listTodos = [];
      todosRef
        .orderByChild('favorite')
        .equalTo(true)
        .once('value', (snapshot) => {
          snapshot.forEach((child) => {
            listTodos.unshift({
              id: child.key,
              name: child.val().name,
              tasks: child.val().tasks,
              favorite: child.val().favorite,
              createdDate: child.val().createdDate,
            });
          });
          resolve(listTodos);
        });
    });
  };

  const deleteTodos = () => {
    let deleteData = {};
    selectedTodos.forEach((value) => {
      deleteData[`${value}`] = null;
    });

    return new Promise((resolve, reject) => {
      todosRef
        .update(deleteData)
        .then((result) => {
          setSelectedTodos([]);
          showToast({
            type: 'success',
            title: 'To do',
            message: 'Todos eliminados con éxito 🎉🎊',
          });
          updateTodos();
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  };

  const toggleFavorite = (id, favorite, index) => {
    var todosArray = [...todos];
    todosArray[index].favorite = !favorite;
    setTodos(todosArray);

    return new Promise((resolve, reject) => {
      todosRef
        .child(id)
        .child('favorite')
        .set(!favorite)
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
        hideMenu={false}
        title={'Favoritos'}
        menuAction={() => {
          navigation.toggleDrawer();
        }}
      />

      <View style={styles.mainContainer}>
        <FlatList
          data={todos}
          columnWrapperStyle={styles.wrapperContainer}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={updateTodos}
          renderItem={({item, index}) => (
            <Todo
              index={index}
              name={item.name}
              tasks={item.tasks}
              createdDate={item.createdDate}
              color={colors[index % colors.length]}
              selected={selectedTodos.includes(item.id)}
              favorite={item.favorite}
              onPress={() => {
                if (selectedMultiple) {
                  selectTodo(item.id);
                } else {
                  navigation.navigate('ShowToDo', {todoItem: item});
                }
              }}
              onLongPress={() => {
                if (selectedTodos.length === 0) {
                  selectTodo(item.id);
                }
              }}
              onFavoritePress={() => {
                toggleFavorite(item.id, item.favorite, index);
              }}
            />
          )}
        />
      </View>
      <FabButton
        selectedMultiple={selectedMultiple}
        onPress={() => {
          if (selectedMultiple) {
            deleteTodos();
          } else {
            navigation.navigate('CreateToDo');
          }
        }}
      />
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
)(Favorites);
