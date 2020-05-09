import React, { useState } from 'react'
import { FlatList, Text, TextInput, Button, View, ActivityIndicator } from 'react-native'
import styles from '../styles/global.js'
import { register } from '../lib/authentication'
import { connect } from '../screens/HomeScreen'

export default function RegisterScreen ({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [message, setMessage] = useState()

  const registerResponse = async (response) => {
    switch (response.status) {
      case 'ok':
        connect()
        navigation.navigate('Home')
        break
      case 'error':
        if (response.reason !== undefined) {
          setMessage(
            <View style={styles.message}>
              <Text style={styles.errorText}>{response.reason}</Text>
            </View>
          )
        } else {
          setMessage(
            <View style={styles.message}>
              <FlatList
                data={response.reasons} renderItem={({ item }) =>
                  <Text style={styles.errorText}>{item.key}</Text>}
              />
            </View>
          )
        }
        break
    }
  }

  return (
    <View style={styles.login}>
      {message}
      <Text style={styles.label}>NID Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your NID number here:'
        onChangeText={username => setUsername(username)}
        defaultValue={username}
      />
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your phone number here:'
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        defaultValue={phoneNumber}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your password:'
        onChangeText={password => setPassword(password)}
        defaultValue={password}
        secureTextEntry
        password
      />
      <Text style={styles.label}>Password Again:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your password again:'
        onChangeText={passwordAgain => setPasswordAgain(passwordAgain)}
        defaultValue={passwordAgain}
        secureTextEntry
        password
      />
      <Button
        style={styles.button}
        title='Register'
        onPress={() => {
          setMessage(
            <View style={styles.message}>
              <ActivityIndicator style={styles.activityIndicator} />
            </View>
          )
          register(registerResponse, username, phoneNumber, password, passwordAgain)
        }}
      />
    </View>
  )
}
