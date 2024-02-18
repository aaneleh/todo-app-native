/* @todo ✅ ARRUMAR SCROLL NO MOBILE */
/* @todo ✅ ORGANIZAR POR ORDEM CRONOLOGICA */
/* @todo ✅ ARRUMAR INPUT DE DATE E TIME NO WEB */
/* @todo PESQUISAR SOBRE PUSH NOTIFICATIONS */
/* @todo useEffect com timeout(?), a cada minuto tenta reorganizar a task list */
/* @todo DEPLOY 🐎 */

import React, {useState, createElement} from 'react'
import { StyleSheet, Text, View , KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Task from './components/task'

function TimePickerWeb({ value, onChange }) {
  return createElement('input', {
    style: {
      borderRadius: 60,
      outline: 'none',
      border: 'none',
      padding: 10,
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
    type: 'time',
    value: value,
    onInput: onChange,
  })
}
function DatePickerWeb({ value, onChange }) {
  return createElement('input', {
    style: {
      borderRadius: 60,
      outline: 'none',
      border: 'none',
      padding: 10,
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
    type: 'date',
    value: value,
    onInput: onChange,
  })
}

export default function App() {
  const [tasksList, setTasksList] = useState([ ])
  const [newTask, setNewTask] = useState() 
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  let counter = 0

  const addTask = ()=> {
    Keyboard.dismiss()
    const datetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0)
    const newTaskObj = {
      text: newTask,
      datetime: datetime.toString(),
      completed: false,
    }

    let tasksUpdated = []
    if(tasksList.length == 0 || new Date(tasksList[tasksList.length-1].datetime).getTime() < datetime.getTime()) {
      setTasksList([...tasksList, newTaskObj]) 
    } else {
      for(let i = 0; i< tasksList.length; i++)
        if(new Date(tasksList[i].datetime).getTime() < datetime.getTime()){
          tasksUpdated.push(tasksList[i])
        } else {
          tasksUpdated.push(newTaskObj)
          for(let j = i; j< tasksList.length; j++)
            tasksUpdated.push(tasksList[j])
          break
        }
      setTasksList(tasksUpdated)
    }
    console.log(tasksUpdated)
    setNewTask('')
    setDate(new Date())
    setTime(new Date())
  }

  const completeTask = (index) => {
    let tasksUpdated = [...tasksList]
    tasksUpdated[index].completed = !tasksUpdated[index].completed
    setTasksList(tasksUpdated)
  }

  const clearCompleted = () => {
    let tasksUpdated = [...tasksList]
    for(let i = 0; i < tasksUpdated.length; i++)
      if(tasksUpdated[i].completed){
        tasksUpdated.splice(i, 1)
        i--
      }
    setTasksList(tasksUpdated)
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'>

        <View style={styles.wrapper}>

          <View style={styles.section}>
            <Text style={styles.title}>Tarefas</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.completedSection}>
              <Text style={styles.subtitle}>Concluidos</Text>
              <TouchableOpacity onPress={() => clearCompleted()} style={styles.completedButton}>
                <Text style={styles.completedButtonText}>Limpar concluidas </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.invisible}>{counter = 0}</Text>
            { 
              tasksList.map( (task, key) => {
                if(task.completed) {
                  counter++
                  return (
                    <TouchableOpacity key={key} onPress={() => completeTask(key)}>
                      <Task text={task.text} datetime={task.datetime} completed={task.completed}></Task>
                    </TouchableOpacity>
                  )
                } 
              })
            }
            { counter==0 ? 
                <Text>Nada aqui ainda 😕</Text>
              :
                ''
            }
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Atrasados</Text>
            <Text style={styles.invisible}>{counter = 0}</Text>

            { 
              tasksList.map( (task, key) => {
                if(!task.completed && new Date(task.datetime).getTime() <= new Date().getTime()) {
                  counter++
                  return (
                    <TouchableOpacity key={key} onPress={() => completeTask(key)}>
                      <Task text={task.text} datetime={task.datetime} completed={task.completed}></Task>
                    </TouchableOpacity>
                  )
                }
              })
            }
            { counter==0 ? 
                <Text>Nada aqui</Text>
              :
                ''
            }
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Hoje</Text>
            <Text style={styles.invisible}>{counter = 0}</Text>
            { 
              tasksList.map( (task, key) => {
                if(!task.completed && new Date(task.datetime).getTime() >= new Date().getTime()
                && new Date(task.datetime).getDay() == new Date().getDay()) {
                  counter++
                  return (
                    <TouchableOpacity key={key} onPress={() => completeTask(key)}>
                      <Task text={task.text} datetime={task.datetime} completed={task.completed}></Task>
                    </TouchableOpacity>
                  )
                }
              })
            }
            { counter==0 ? 
                <Text>Nada aqui</Text>
              :
                ''
            }
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Próximos</Text>
            <Text style={styles.invisible}>{counter = 0}</Text>
              { 
                tasksList.map( (task, key) => {
                  if(!task.completed && new Date(task.datetime).getDate() > new Date().getDate()) {
                    counter++
                    return (
                      <TouchableOpacity key={key} onPress={() => completeTask(key)}>
                        <Task text={task.text} datetime={task.datetime} completed={task.completed}></Task>
                      </TouchableOpacity>
                    )
                  }
                })
              }
            { counter==0 ? 
                <Text>Nada aqui</Text>
              :
                ''
            }
          </View> 

        </View>

      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS == 'ios' ? "padding" : "height"}
        style={Platform.OS == 'web' ?  [styles.inputWrapper, styles.inputWrapperFixed] :  styles.inputWrapper}>

          <View style={styles.inputContainer}>
            <View style={styles.inputContent}>
              <TextInput onChangeText={(e) => setNewTask(e)} value={newTask}
              style={styles.input} placeholder={'Nova tarefa'}/>

              <View>
                { 
                Platform.OS != 'web' ?
                  <View style={styles.dateInput}>
                    <DateTimePicker
                      value={time}
                      mode={'time'}
                      is24Hour={true}
                      onChange={(e, newTime) => setTime(newTime)}
                    />
                    <DateTimePicker
                      value={date}
                      mode={'date'}
                      onChange={(e, newDate) => setDate(newDate)}
                    />
                  </View>
                :
                  <View style={styles.dateInput}>
                    <TimePickerWeb 
                      style={styles.webInput}
                      value={ time.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + time.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
                      onChange={(e) => setTime(new Date(2024, 1, 1, e.target.value.substring(0,2) , e.target.value.substring(3,5), 0))                  
                      }>
                    </TimePickerWeb>
                    <DatePickerWeb 
                      style={styles.webInput}
                      value={ date.getFullYear().toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping:false}) + '-' + (date.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '-' + date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) }
                      onChange={(e) => setDate(new Date((e.target.value).substring(0,4) , parseInt(e.target.value.substring(5,7),10)-1 , (e.target.value).substring(8,10) , 12, 0, 0))
                      }>
                    </DatePickerWeb>
                  </View>
                }
              </View>
            </View>

            <TouchableOpacity onPress={() => addTask()}>
              <View style={styles.addButton}>
                <Text>+</Text>
              </View>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 60,
    paddingBottom: 240,
  },
  section: {
    width: '85%',
    textAlign: 'left',
    marginTop: 40,
    display: 'flex',
    gap: 16,
  },
  completedSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completedButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  completedButtonText: {
    fontSize: 12
  },
  invisible: {
    opacity: 0,
    height: 0
  },
  title: {
    fontSize: 36,
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600'
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#E8EAED',
    borderTopWidth: 1,
    borderTopColor: '#C0C0C0',
  },
  inputContainer: {
    paddingBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
  },
  inputWrapperFixed: {
    position: 'fixed',
    bottom: 0,
  },
  inputContent: {
    width: '80%',
    display: 'flex',
    gap: 16
  },
  dateInput: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between', 
    paddingRight: 15,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 60,
    width: '100%',
    padding: 15,
  },
  addButton: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 40,
    height: 40,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } 

});