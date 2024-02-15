import React from "react"
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from "react-native-web"

const Task = (props) => {
    const date = new Date(props.datetime)
    const monthNames = ["Jan", "Fev", "Marc", "Abr", "Maio", "Jun", "Jul", "Aug", "Set", "Out", "Nov", "Dez"]

    return (
        <View style={styles.wrapper}>
            <View style={styles.description}>
                <Text style={[styles.title, props.completed ?  styles.crossed : '']}>{props.text}</Text>
                <Text> { date.getDate() + " " + monthNames[date.getMonth()]  + " " +  date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} </Text>
            </View>
            <View style={[styles.checkbox, props.completed ?  styles.checkedbox : '']}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexShrink: 1,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    description: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        justifyContent: 'space-between',
        gap: 8
    },
    title: {
        maxWidth: '60%',
        textAlign: 'justify'        
    },
    crossed: {
        textDecorationLine: 'line-through'
    },
    checkbox: {
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 8,
        width: 24,
        height: 24,
    },
    checkedbox: {
        backgroundColor:'#55BCF6',
    }
})

export default Task