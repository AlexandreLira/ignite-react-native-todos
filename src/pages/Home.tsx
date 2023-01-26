import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  function handleAddTask(newTaskTitle: string) {
    const isTaskTitleRegister = tasks.find(task => task.title === newTaskTitle)

    if (isTaskTitleRegister) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    //TODO - add new task
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }


    setTasks(state => [...state, newTask])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const tasksDones = tasks.map(task => task.id === id ? { ...task, done: !task.done } : task)
    setTasks(tasksDones)
  }

  function removeTask(id: number) {
    setTasks(state => state.filter(task => task.id !== id))
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [{
        text: 'Não'
      },
      {
        text: 'Sim',
        onPress: () => removeTask(id)
      }
      ])
    //TODO - remove task from state

  }


  function handleEditTask(taskId: number, taskNewTitle: string) {
    const tasksEdit = tasks.map(task => task.id === taskId 
      ? { ...task, title: taskNewTitle } 
      : task
    )
    setTasks(tasksEdit)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})