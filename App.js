import React, {useState} from 'react'
import { StyleSheet, Text, View , KeyboardAvoidingView, TextInput, TouchableOpacity, Image} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Task from './components/task'

export default function App() {

  const [tasksList, setTasksList] = useState([
    {
      text: 'Tarefa 1',
      date: new Date(2024, 1, 14, 14, 0, 0).toDateString(),
      time: new Date(2024, 1, 14, 14, 0, 0).toTimeString(),
      completed: false
    },
    {
      text: 'Tarefa 2',
      date: new Date(2024, 1, 15, 14, 0, 0).toDateString(),
      time: new Date(2024, 1, 15, 14, 0, 0).toTimeString(),
      completed: true
    },
    {
      text: 'Tarefa 3',
      date: new Date(2024, 1, 12, 14, 0, 0).toDateString(),
      time: new Date(2024, 1, 12, 14, 0, 0).toTimeString(),
      completed: false
    },
    {
      text: 'Tarefa 4',
      date: new Date(2024, 1, 15, 19, 0, 0).toDateString(),
      time: new Date(2024, 1, 15, 19, 0, 0).toTimeString(),
      completed: false
    },
])

  const [newTask, setNewTask] = useState() 
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())

  const addTask = ()=> {
    setTasksList([...tasksList, 
      {
        text: newTask,
        date: date.toDateString(),
        time: time.toTimeString(),
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

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>

        <View style={styles.section}>
          <Text style={styles.title}>Tarefas</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Atrasados</Text>
          { 
            tasksList.map( (task, key) => {
              if(new Date(task.date).getTime() < new Date().getTime()) {
                //talvez problema com mesmo dia mas horários atrasado
                return (
                  <TouchableOpacity key={key} onPress={() => completeTask(key)}>
                    <Task text={task.text} date={task.date} time={task.time} completed={task.completed}></Task>
                  </TouchableOpacity>
                )
              } 
            })
          }
        </View>

{/*         <View style={styles.section}>
          <Text style={styles.subtitle}>Hoje</Text>
          { 
            tasksList.map( (task, key) => {
              //if(new Date(task.date).getDay() == new Date().getDay) return <Task>
              if(true) {
                return (
                  <TouchableOpacity key={key} onPress={() => completeTask(key)}>
                    <Task text={task.text} date={task.date} completed={task.completed}></Task>
                  </TouchableOpacity>
                )
              }
            })
          }
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Próximos</Text>
          
        </View>  */}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS == 'ios' ? "padding" : "height"}
        style={styles.inputWrapper}>

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
    overflow: 'scroll',
  },
  section: {
    width: '85%',
    textAlign: 'left',
    marginTop: 40,
    display: 'flex',
    gap: 16,
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