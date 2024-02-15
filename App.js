import React, {useState} from 'react'
import { StyleSheet, Text, View , KeyboardAvoidingView, TextInput, TouchableOpacity, Image} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Task from './components/task'

export default function App() {

  const [tasksList, setTasksList] = useState([ {
    text: 'Tarefa 0',
    datetime: new Date(2024, 1, 14, 14, 0, 0).toString(),
    completed: false
  },
  {
    text: 'Tarefa 1',
    datetime: new Date(2024, 1, 14, 23, 0, 0).toString(),
    completed: false
  },
  {
    text: 'Tarefa 2',
    datetime: new Date(2024, 1, 15, 14, 0, 0).toString(),
    completed: true
  },
  {
    text: 'Tarefa 3',
    datetime: new Date(2024, 1, 12, 14, 0, 0).toString(),
    completed: false
  },
  {
    text: 'Tarefa 4',
    datetime: new Date(2024, 1, 15, 19, 0, 0).toString(),
    completed: false
  }])

  const [newTask, setNewTask] = useState() 
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  let counter = 0

  const addTask = ()=> {
    const datetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0)
    setTasksList([...tasksList, 
      {
        text: newTask,
        datetime: datetime.toString(),
        completed: false,
      }
    ]) 
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
    /* map, se !completed compia pra nova lista, depois sobreescreve taskList */
    let tasksUpdated = [...tasksList]
    for(let i = 0; i< tasksUpdated.length; i++){
      if(tasksUpdated[i].completed){
        tasksUpdated.splice(i, 1)
        i--
      }
    }
    setTasksList(tasksUpdated)
  }

  return (
    <View style={styles.container}>
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
              <Text>Nada aqui</Text>
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
              if(!task.completed && new Date(task.datetime).getTime() > new Date().getTime()
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
                if(!task.completed && new Date(task.datetime).getDay() > new Date().getDay()) {
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

      <KeyboardAvoidingView 
        behavior={Platform.OS == 'ios' ? "padding" : "height"}
        style={Platform.OS == 'web' ?  [styles.inputWrapper, styles.inputWrapperFixed] :  styles.inputWrapper}>

          <View style={styles.inputContent}>
            <TextInput onChangeText={(e) => setNewTask(e)} value={newTask}
            style={styles.input} placeholder={'Nova tarefa'}/>

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
          </View>

          <TouchableOpacity onPress={() => addTask()}>
            <View style={styles.addButton}>
              <Text>  + </Text>
            </View>
          </TouchableOpacity>
          
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 60,
    paddingBottom: 200,
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
    width: '100%',
    bottom: 40,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#E8EAED',
    borderTopWidth: 1,
    borderTopColor: '#C0C0C0',
    
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
  },

});